
const sendMail = require('../service/sendMail')
import { generateJwt, decodeJwt } from '../service/jwtService'
import { hashPassword } from '../service/passwordService'
import { findStaffByEmail, insertStaff } from '../mongodb/staff'
import { updateInvitedStaff, findInvitedStaff, deleteInvitedStaff } from '../mongodb/invitedStaff'
import { ObjectId } from 'mongodb'

const dbName = process.env.DB_NAME
const collectionName = 'staff'

const inviteStaff = async (ctx) => {
    let { email, role } = ctx.request.body;

    email = email.trim()
    const user = ctx.user

    const inviteStaffToken = generateJwt({ email, role, isInvited: true })

    await updateInvitedStaff({ email }, { $set: { email, role, store_id: new ObjectId(user.store_id), expiresIn: Date.now() + 3600000, invited_merchant_id: new ObjectId(user._id) } }, { upsert: true })

    const inviteLink = `${process.env.INVITE_LINK}/invitation?token=${inviteStaffToken}`

    await sendMail(email, "Invitation", "Accept invitation", inviteLink)

    ctx.body = { success: true, msg: "Email sent" }
}

// need to store store_id in invited staff
const acceptInvitation = async (ctx) => {
    let { fname, lname, password } = ctx.request.body;

    const user = ctx.user;

    user.email = user.email.trim()

    const hashedPassword = await hashPassword(password);

    await insertStaff({ firstName: fname, lastName: lname, email: user.email, password: hashedPassword, role: user.role, store_id: new ObjectId(user.store_id) })

    await deleteInvitedStaff({ email: user.email })

    ctx.body = { success: true, msg: "Registration successfull" }

}

export { inviteStaff, acceptInvitation }