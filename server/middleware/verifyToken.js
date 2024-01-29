const jwt = require('jsonwebtoken')

const verify = (ctx, next) => {
    const token = ctx.header['authorization']

    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_VALUE)
        if (!user) {
            ctx.body = { success: false, msg: "JWT token is missing" }
            return
        }
        // if (user.role !== 'admin') {
        //     ctx.body = { success: false, msg: "not allowed" }
        //     return
        // }
        ctx.req.user = user
        next()
    } catch (err) {
        ctx.body = { success: false, msg: err.message }
    }
}

module.exports = verify