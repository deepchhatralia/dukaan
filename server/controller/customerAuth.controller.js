const roles = require("../constants/roles")
const { insertCustomer } = require("../mongodb/customer")
const { generateJwt } = require("../service/jwtService")
const { hashPassword, comparePassword } = require("../service/passwordService")

const loginController = async ctx => {
    const inputEmail = ctx.request.body.email.trim()
    const password = ctx.request.body.password

    const data = ctx.user
    const { _id, firstName, lastName, email, role } = data

    const passwordMatched = await comparePassword(password, data.password);

    if (passwordMatched) {
        const token = generateJwt({ _id, email, role });

        ctx.body = {
            success: true, user: { _id, firstName, lastName, email, role }, token
        }
        return
    }

    ctx.body = { success: false, msg: "Invalid username or password" }
}

const signupController = async ctx => {
    let { fname, lname, email, password, city, state, country } = ctx.request.body;

    fname = fname.trim()
    email = email.trim()
    city = city.trim()
    state = state.trim()
    country = country.trim()

    const hashedPassword = await hashPassword(password);

    ack = await insertCustomer({ fname, lname, email, password: hashedPassword, city, state, country, role: roles.CUSTOMER });

    const token = generateJwt({ _id: ack.insertedId, email, role: roles.CUSTOMER });

    ctx.body = {
        success: true, user: { _id: ack.insertedId }, token
    }
}

module.exports = { loginController, signupController }