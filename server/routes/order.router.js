const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/api/v1/customer/order' })


const authMiddleware = require('../middleware/auth.middleware')
// const getMerchantStoreId = require('../middleware/store.middleware')


router.get('/',
    authMiddleware,
    // getMerchantStoreId
)

module.exports = router