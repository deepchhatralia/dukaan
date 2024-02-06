import bluebird from 'bluebird'

const validate = (validators) => {
    return async (ctx, next) => {
        const validationErrors = []

        await bluebird.map(validators, (fun => {
            const err = fun(ctx.request.body, ctx)

            if (err) {
                validationErrors.push(err)
            }
        }))

        if (validationErrors.length) {
            return ctx.body = { success: false, msg: validationErrors }
        }
        await next()
    }
}
export default validate