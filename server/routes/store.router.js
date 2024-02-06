const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/api/v1/store' })

const validate = require('../middleware/validate.middleware')
const dbValidate = require('../middleware/dbValidate.middleware')

const { nameValidator, contactValidator, isOpenValidator, merchantIdValidator, storeIdValidator, cityValidator, stateValidator, countryValidator, storeLinkValidator } = require('../validators/store.validator')
const { storeLinkExistValidator, merchantIdExistInUser, storeAlreadyExist } = require('../db.validators/store.db.validator')
const { addStore, getMerchantStore, deleteStore, updateStore, getMerchantStoreById } = require('../controller/store.controller')
const authMiddleware = require('../middleware/auth.middleware')
const auth2Middleware = require('../middleware/auth2.middleware')
const roles = require('../constants/roles')


// get all stores of merchant 
router.post('/',
    auth2Middleware,
    getMerchantStore
)

router.get('/:storeId',
    auth2Middleware,
    getMerchantStoreById
)

router.post('/addStore',
    auth2Middleware([roles.MERCHANT]),
    validate([nameValidator, storeLinkValidator, contactValidator, isOpenValidator, cityValidator, stateValidator, countryValidator]),
    dbValidate([storeAlreadyExist, storeLinkExistValidator]),
    addStore
)

router.put('/updateStore',
    auth2Middleware,
    validate([storeLinkValidator, storeIdValidator, nameValidator, contactValidator, isOpenValidator, cityValidator, stateValidator, countryValidator]),
    dbValidate([storeLinkExistValidator]),
    updateStore
)

router.delete('/deleteStore',
    auth2Middleware,
    validate([storeIdValidator]),
    deleteStore
)

module.exports = router