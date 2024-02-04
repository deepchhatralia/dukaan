const client = require('../config/db.config')
const jwt = require('jsonwebtoken')
const sendMail = require('../service/sendMail')
const { generateJwt, decodeJwt } = require('../service/jwtService')
const { hashPassword } = require('../service/passwordService')
const { findStaffByEmail, insertStaff } = require('../mongodb/staff')
const { updateToken, findToken, deleteToken } = require('../mongodb/token')

const dbName = process.env.DB_NAME
const collectionName = 'staff'

// using staff collection 
const inviteStaff = async (ctx) => {
    let { email, role } = ctx.request.body;

    email = email.trim()

    const user = await findStaffByEmail(email)

    if (user) {
        ctx.body = { success: false, msg: "User already exist" }
        return
    }

    const inviteStaffToken = generateJwt({ email, role, invited_merchant_id: ctx.user._id, isInvited: true })

    await updateToken({ email }, { $set: { email, role, invited_merchant_id: ctx.user._id, expiresIn: Date.now() + 3600000 } }, { upsert: true })

    const inviteLink = `${process.env.INVITE_LINK}/invitation?token=${inviteStaffToken}`

    await sendMail(email, "Staff invitation", "Accept invitation", inviteLink)

    ctx.body = { success: true, msg: "Email sent" }
}

const verifyStaffToken = async (ctx) => {
    let { fname, lname, password, cpassword, token } = ctx.request.body;

    try {
        const user = ctx.user;

        user.email = user.email.trim()

        const temp = await findToken({ email: user.email, expiresIn: { $gt: Date.now() } })

        if (temp) {
            const hashedPassword = await hashPassword(password);

            await insertStaff({ firstName: fname, lastName: lname, email: user.email, password: hashedPassword, role: user.role, invited_merchant_id: ctx.user.invited_merchant_id, isInvited: true })

            await deleteToken({ email: user.email })

            ctx.body = { success: true, msg: "Registration successfull" }

            return
        }

        ctx.body = { success: false, msg: "Invalid or missing token" }

    } catch (err) {
        console.log(err)
        ctx.body = { success: false, msg: err.message }
    }
}

module.exports = { inviteStaff, verifyStaffToken }