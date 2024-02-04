const authRouter = require('./auth.router')
const staffRouter = require('./staff.router')
const storeRouter = require('./store.router')
const categoryRouter = require('./category.router')
const productRouter = require('./product.router')

const customerRouter = require('./customerAuth.router')
const addressRouter = require('./address.router')
const cartRouter = require('./cart.router')

module.exports = {
    authRouter, staffRouter, storeRouter, categoryRouter, productRouter,
    customerRouter, addressRouter, cartRouter
}