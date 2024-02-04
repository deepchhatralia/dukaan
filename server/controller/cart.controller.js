const getCustomerCart = async (ctx) => {
    const customer_id = ctx.user._id

    ctx.body = customer_id
}

module.exports = { getCustomerCart }