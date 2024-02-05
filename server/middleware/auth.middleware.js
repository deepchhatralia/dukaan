require('dotenv').config()
const { decodeJwt } = require('../service/jwtService');
const { findStaffById } = require('../mongodb/staff');
const { findCustomerById } = require('../mongodb/customer');
const roles = require('../constants/roles');
const { findToken } = require('../mongodb/token');

const authMiddleware = async (ctx, next) => {
    const token = ctx.header['authorization']

    if (!token) {
        ctx.body = { success: false, msg: "Unauthorized!" };
        return;
    }


    try {
        const user = decodeJwt(token);

        // ctx.user = user

        if (!user) {
            ctx.status = 404
            ctx.body = { success: false, msg: "Authentication error 1" }
            return
        }

        let dbUser;
        if (user.role === roles.CUSTOMER) {
            dbUser = await findCustomerById(user._id);
        }
        else if (user?.isInvited) {
            dbUser = await findToken({ email: user.email });
        }
        else {
            dbUser = await findStaffById(user._id);
        }

        if (!dbUser) {
            ctx.status = 404
            ctx.body = { success: false, msg: "User doesnt exist" }
            return
        }

        ctx.user = dbUser
        ctx.request.user = dbUser

        return next()
    } catch (err) {
        console.log(err.message)
        ctx.body = { success: false, msg: "Authentication error 2" }
    }

}

module.exports = authMiddleware