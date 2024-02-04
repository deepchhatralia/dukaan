const { findStaffByEmail } = require("../mongodb/staff");
const { findToken } = require("../mongodb/token");
const { comparePassword } = require("../service/passwordService");

const emailDoesntExistValidator = async (ctx) => {
    let err = null;

    const inputEmail = ctx.request.body.email.trim()

    const data = await findStaffByEmail(inputEmail)

    if (!data) {
        err = { success: false, msg: "Email doesnt exist" }
        return err;
    }
    ctx.user = data
    return null;
}

const emailExistValidator = async (ctx) => {
    let err = null;

    const email = ctx.request.body.email;

    let ack = await findStaffByEmail(email)

    if (ack) {
        err = { success: false, msg: "Email already exist" }
        return err;
    }
    return err;
}

// call decodeJwt()
const unexpiredTokenExist = async (ctx) => {
    let err = null;

    // const { token, password } = ctx.user

    const temp = await findToken({ email: ctx.user.email, expiresIn: { $gt: Date.now() } })

    if (!temp) {
        err = { success: false, msg: "Authorization denied" }
        return err
    }
    return err
}

const findStaffAndVerifyPassword = async (ctx) => {
    let err = null

    const email = ctx.user.email
    const oldPassword = ctx.request.body.oldPassword

    const user = await findStaffByEmail(email);

    if (!user) {
        err = { success: false, msg: "User doesnt exist" }
        return err;
    }

    const passwordMatched = await comparePassword(oldPassword, user.password);

    if (!passwordMatched) {
        err = { success: false, msg: "Old password doesnt match" }
        return err
    }
    return err
}


module.exports = { emailDoesntExistValidator, emailExistValidator, unexpiredTokenExist, findStaffAndVerifyPassword }