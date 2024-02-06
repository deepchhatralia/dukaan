require('dotenv').config()
const { ObjectId } = require('mongodb')
const roles = require("../constants/roles")
const { insertCustomer } = require("../mongodb/customer")
const { findUserByEmail, insertUser, updateUser } = require('../mongodb/user')
const { sendMail } = require('../service')
const { generateJwt } = require("../service/jwtService")
const { hashPassword, comparePassword } = require("../service/passwordService")
const { findStoreByLink } = require('../mongodb/store')


const signInController = async ctx => {
    const inputEmail = ctx.request.body.email.trim()
    const storeLink = ctx.request.body.store_link.trim()

    const token = generateJwt({ email: inputEmail, role: roles.CUSTOMER, store: storeLink })

    const loginLink = `${process.env.LOGIN_LINK}/signin?token=${token}`



    await updateUser({ email: inputEmail }, { $set: { role: roles.CUSTOMER, store_id: new ObjectId(store._id) } }, { upsert: true })

    const resp = await sendMail(inputEmail, "Login link", "Login link", loginLink)

    ctx.body = { success: true, msg: "Login link sent to your email" }
}

const verifyLoginLinkController = async ctx => {
    const user = ctx.user

    const jwtToken = generateJwt({ email: user.email, role: user.role })

    ctx.body = { success: true, token: jwtToken }
}


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

module.exports = {
    loginController, signupController,
    signInController, verifyLoginLinkController
}