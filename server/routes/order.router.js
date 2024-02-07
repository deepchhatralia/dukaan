import KoaRouter from 'koa-router'
const router = new KoaRouter({ prefix: '/api/v1/orders' })

import roles from '../constants/roles'
import auth2Middleware from '../middleware/auth2.middleware'
import validate from '../middleware/validate.middleware'
import dbValidate from '../middleware/dbValidate.middleware'

import { changeOrderStatus, getAllCustomerOrders, getAllMerchantOrders, getMerchantOrder, placeOrder } from '../controller/order.controller'
import { orderIdValidator, statusValidator } from '../validators/order.validator'
import { getStoreId } from '../middleware/store.middleware'
import { storeLinkValidator } from '../validators/store.validator'
import { checkAvailability } from '../db.validators/order.db.validator'


// for customer 
router.get('/c/',
    auth2Middleware([roles.CUSTOMER]),
    validate([storeLinkValidator]),
    getStoreId,
    getAllCustomerOrders
)

router.post('/c/placeOrder',
    auth2Middleware([roles.CUSTOMER]),
    validate([storeLinkValidator]),
    getStoreId,
    dbValidate([checkAvailability]),
    placeOrder
)

router.get('/c/:orderId',
    auth2Middleware([roles.CUSTOMER]),
    validate([storeLinkValidator, orderIdValidator]),
    getStoreId,
    getAllCustomerOrders
)




// for seller 
router.get('/',
    auth2Middleware([roles.MERCHANT, roles.ADMIN, roles.MANAGER, roles.STAFF]),
    getAllMerchantOrders
)

router.get('/:orderId',
    auth2Middleware([roles.MERCHANT, roles.ADMIN, roles.MANAGER, roles.STAFF]),
    validate([orderIdValidator]),
    getMerchantOrder
)

router.patch('/status/change',
    auth2Middleware([roles.MERCHANT, roles.ADMIN, roles.MANAGER, roles.STAFF]),
    validate([statusValidator, orderIdValidator]),
    changeOrderStatus
)

export default router