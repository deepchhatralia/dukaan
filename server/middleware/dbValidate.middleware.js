const bluebird = require('bluebird')

const dbValidate = (validators) => {
    return async (ctx, next) => {
        const validationErrors = []

        await bluebird.map(validators, (async fun => {
            const err = await fun(ctx)

            if (err) {
                validationErrors.push(err)
            }
        }))

        // console.log(validationErrors)
        if (validationErrors.length) {
            return ctx.body = { success: false, message: validationErrors, msg: "Error" }
        }
        await next()
    }
}

module.exports = dbValidate