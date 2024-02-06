const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/api/v1/customer/order' })


const auth2Middleware = require('../middleware/auth2.middleware')
const validate = require('../middleware/validate.middleware')
// const getMerchantStoreId = require('../middleware/store.middleware')


// for seller 
router.get('/',
    auth2Middleware,
    validate([]),
)

module.exports = router