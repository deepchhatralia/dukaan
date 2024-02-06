const allowedRoles = (acceptedRoles) => {
    return (ctx, next) => {
        if (acceptedRoles.some(role => role === ctx.user.role)) {
            return next()
            // return
        }
        ctx.body = { success: false, msg: "Role not authorized" }
        return
    }
}

export default allowedRoles