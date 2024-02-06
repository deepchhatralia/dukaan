const client = require('../config/db.config')
const jwt = require('jsonwebtoken')
const sendMail = require('../service/sendMail')
const { generateJwt, decodeJwt } = require('../service/jwtService')
const { hashPassword } = require('../service/passwordService')
const { findStaffByEmail, insertStaff } = require('../mongodb/staff')
const { updateInvitedStaff, findInvitedStaff, deleteInvitedStaff } = require('../mongodb/token')
const { ObjectId } = require('mongodb')

const dbName = process.env.DB_NAME
const collectionName = 'staff'

const inviteStaff = async (ctx) => {
    let { email, role } = ctx.request.body;

    email = email.trim()
    const user = ctx.user

    // isInvited will be used at auth.middleware to find staff either from invitedStaff or user
    const inviteStaffToken = generateJwt({ email, role, isInvited: true })

    // await updateInvitedStaff({ email }, { $set: { email, role, invited_merchant_id: ctx.user._id, expiresIn: Date.now() + 3600000 } }, { upsert: true })

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

module.exports = { inviteStaff, acceptInvitation }