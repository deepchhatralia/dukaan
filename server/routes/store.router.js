const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/api/v1/store' })

const validate = require('../middleware/validate.middleware')
const dbValidate = require('../middleware/dbValidate.middleware')

const { nameValidator, contactValidator, isOpenValidator, merchantIdValidator, storeIdValidator, cityValidator, stateValidator, countryValidator, storeLinkValidator } = require('../validators/store.validator')
const { storeLinkExistValidator, merchantIdExistInUser, storeAlreadyExist } = require('../db.validators/store.db.validator')
const { addStore, getMerchantStore, deleteStore, updateStore, getMerchantStoreById } = require('../controller/store.controller')
const authMiddleware = require('../middleware/auth.middleware')


// get all stores of merchant 
router.post('/',
    authMiddleware,
    getMerchantStore
)

router.get('/:storeId',
    authMiddleware,
    getMerchantStoreById
)

router.post('/addStore',
    authMiddleware,
    validate([nameValidator, storeLinkValidator, contactValidator, isOpenValidator, cityValidator, stateValidator, countryValidator]),
    dbValidate([storeAlreadyExist, storeLinkExistValidator]),
    addStore
)

router.put('/updateStore',
    authMiddleware,
    validate([storeIdValidator, nameValidator, contactValidator, isOpenValidator, cityValidator, stateValidator, countryValidator]),
    dbValidate([storeLinkExistValidator]),
    updateStore
)

router.delete('/deleteStore',
    authMiddleware,
    validate([storeIdValidator]),
    deleteStore
)

module.exports = router