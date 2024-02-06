import { findStaffByEmail } from "../mongodb/staff"
import { findInvitedStaff } from "../mongodb/invitedStaff"
import { comparePassword } from "../service/passwordService"

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

    const email = ctx.request.body.email.trim()

    let ack = await findStaffByEmail(email)
    console.log(ack)

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

    const temp = await findInvitedStaff({ email: ctx.user.email, expiresIn: { $gt: Date.now() } })

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

const storeExist = async ctx => {
    let err = null

    if (!ctx.user?.store_id) {
        err = { success: false, msg: "First add store" }
        return err
    }
    return err
}

export { emailDoesntExistValidator, emailExistValidator, unexpiredTokenExist, findStaffAndVerifyPassword, storeExist }