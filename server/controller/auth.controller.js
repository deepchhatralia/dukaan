
const client = require('../config/db.config')
const jwt = require('jsonwebtoken')
const User = require('../model/User')
const bcrypt = require('bcrypt')

const dbName = "test"
const collectionName = "users"
const SECRET_VALUE = process.env.ACCESS_TOKEN_SECRET_VALUE

const hashPassword = async (password) => {
    const data = await bcrypt.hash(password, 10)
    return data
}

const comparePassword = async (password, orignalHashedPassword) => {
    const data = await bcrypt.compare(password, orignalHashedPassword)
    return data
}

const loginController = async ctx => {
    const email = ctx.request?.body?.email
    const password = ctx.request?.body?.password

    if (!(email && password)) {
        ctx.body = { success: false, msg: "All fields are required" }
        return
    }

    try {
        const data = await client.getDb().db(dbName).collection(collectionName).findOne({ email: email })

        if (!data) {
            ctx.body = { success: false, msg: "User does not exist" }
            return;
        }

        const passwordMatched = await comparePassword(password, data.password);

        if (passwordMatched) {
            const token = jwt.sign(data, SECRET_VALUE, { expiresIn: "1h" });

            ctx.body = { success: true, data, token }
            return
        }

        ctx.body = { success: false, msg: "Invalid username or password" }
    } catch (err) {
        console.log(err)
        ctx.body = { success: false, msg: err.message }
    }
}

const signupController = async ctx => {
    // const fname = ctx.request?.body?.fname
    // const lname = ctx.request?.body?.lname
    // const email = ctx.request?.body?.email
    // const password = ctx.request?.body?.password
    // const cpassword = ctx.request?.body?.cpassword

    const { fname, lname, email, password, cpassword } = ctx.request.body;

    if (!(fname && lname && email && password && cpassword)) {
        ctx.body = { success: false, msg: "All fields are required" }
        return
    }

    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
        ctx.body = "Invalid email address"
        return
    }

    if (password !== cpassword) {
        ctx.body = { success: false, msg: "Password does not match" }
        return
    }

    try {
        let ack = await client.getDb().db(dbName).collection(collectionName).findOne({ email });

        if (ack) {
            ctx.body = { success: false, msg: "Email already exist" }
            return
        }

        const hashedPassword = await hashPassword(password);

        const user = new User(fname, lname, email, hashedPassword)

        ack = await client.getDb().db(dbName).collection(collectionName).insertOne(user.getObj());

        ctx.body = { success: true, ...ack }
    } catch (err) {
        console.log(err)
        ctx.body = { success: false, msg: err.message }
    }
}

module.exports = { loginController, signupController }