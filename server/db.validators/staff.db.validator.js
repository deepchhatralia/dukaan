import { findInvitedStaff } from "../mongodb/invitedStaff"
import { decodeJwt } from "../service/jwtService"

const verifyStaffToken = async (ctx) => {
    let err = null
    const token = ctx.params.token

    if (!token) {
        err = { success: false, msg: "Unauthorized!" };
        return err
    }

    const user = decodeJwt(token);

    if (!user) {
        err = { success: false, msg: "Authentication error" }
        return err
    }

    const dbUser = await findInvitedStaff({ email: user.email })

    if (!dbUser) {
        err = { success: false, msg: "Staff doesnt exist" }
        return err
    }
    ctx.user = dbUser
    return err
}

const invitedStaffExists = async ctx => {
    let err = null

    const user = ctx.user;

    user.email = user.email.trim()

    const temp = await findInvitedStaff({ email: user.email, expiresIn: { $gt: Date.now() } })

    if (!temp) {
        err = { success: false, msg: "Expired" }
        return
    }
    return err
}

export { verifyStaffToken, invitedStaffExists }