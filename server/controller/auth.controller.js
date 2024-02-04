
const client = require('../config/db.config')
const User = require('../model/User')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')

const { sendMail, passwordService: { hashPassword, comparePassword }, jwtService: { generateJwt, decodeJwt } } = require('../service')

const { findStaffByEmail, insertStaff, updateStaff } = require('../mongodb/staff')
const { deleteToken, updateToken, findToken } = require('../mongodb/token')
const roles = require('../constants/roles')

const dbName = process.env.DB_NAME
let collectionName = "staff"
const SECRET_VALUE = process.env.ACCESS_TOKEN_SECRET_VALUE

const loginController = async ctx => {
    const inputEmail = ctx.request?.body?.email.trim()
    const password = ctx.request?.body?.password

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
    const { fname, lname, email, password } = ctx.request.body;

    const hashedPassword = await hashPassword(password);

    const user = new User(fname, lname, email, hashedPassword)

    ack = await insertStaff(user.getObj());

    const token = generateJwt({ _id: ack.insertedId, email, role: roles.MERCHANT });

    ctx.body = {
        success: true, user: { _id: ack.insertedId }, token
    }
}

// change password while logged in
const changePasswordController = async (ctx) => {
    const email = ctx.user.email

    const oldPassword = ctx.request.body?.oldPassword.trim();
    const newPassword = ctx.request.body?.password.trim();


    const newHashedPassword = await hashPassword(newPassword);

    await updateStaff({ email }, { $set: { password: newHashedPassword } })

    ctx.body = { success: true, msg: "Password changed" }
}

// collection used - token
const sendResetLink = async ctx => {
    const email = ctx.request.body.email.trim();

    const resetPassToken = generateJwt({ email })
    const resetLink = `${process.env.RESET_LINK}/resetPassword?token=${resetPassToken}`

    sendMail('forstudycoding@gmail.com', "Reset password link", "Change password", resetLink)

    // fire update query with upsert 
    // await updateToken({ email }, { $set: { token: resetPassToken, expiresIn: Date.now() + 3600000 } }, { upsert: true })

    await updateToken({ email }, { $set: { expiresIn: Date.now() + 3600000 } }, { upsert: true })

    ctx.body = { success: true, msg: "Email sent" }
}

// collection used - token
const verifyResetToken = async (ctx) => {

    const { password } = ctx.request.body

    // user set in authMiddleware
    const obj = ctx.user;
    const hashedPassword = await hashPassword(password);

    await updateStaff({ email: obj.email }, { $set: { password: hashedPassword } })

    await deleteToken({ email: obj.email })

    ctx.body = { success: true, msg: "Password changed" }
}

module.exports = { loginController, signupController, changePasswordController, sendResetLink, verifyResetToken }