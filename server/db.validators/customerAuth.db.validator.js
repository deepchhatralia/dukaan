const { findCustomerByEmail } = require("../mongodb/customer");

const emailExistValidator = async (ctx) => {
    const email = ctx.request.body.email.trim()

    let err = null;

    let ack = await findCustomerByEmail(email)

    if (ack) {
        err = { success: false, msg: "Email already exist" }
        return err;
    }
    return err;
}

const emailDoesntExistValidator = async (ctx) => {
    let err = null;

    const inputEmail = ctx.request.body.email.trim()

    const data = await findCustomerByEmail(inputEmail)

    if (!data) {
        err = { success: false, msg: "Email doesnt exist" }
        return err;
    }
    ctx.user = data
    return null;
}

module.exports = { emailExistValidator, emailDoesntExistValidator }