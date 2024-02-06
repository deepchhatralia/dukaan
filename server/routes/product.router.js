const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/api/v1/product' })

const authMiddleware = require('../middleware/auth.middleware')
const validate = require('../middleware/validate.middleware')
const dbValidate = require('../middleware/dbValidate.middleware')
const getMerchantStoreId = require('../middleware/store.middleware');

const { productNameValidator, descriptionValidator, stockValidator, isActiveValidator, priceValidator, discountedPriceValidator, imageLinkValidator, categoryIdValidator, productIdValidator, oldProductNameValidator } = require('../validators/product.validator');

const { getProducts, addProductController, deleteProduct, updateProduct, getProduct, getActiveProducts, getProductsByStoreLink } = require('../controller/product.controller');
const { productNameAlreadyExist, productNameValidateForUpdate } = require('../db.validators/product.db.validator')
const allowedRoles = require('../middleware/role.middleware')
const roles = require('../constants/roles')
const { storeLinkValidator } = require('../validators/store.validator')
const auth2Middleware = require('../middleware/auth2.middleware')
const { storeExist } = require('../db.validators/auth.db.validator')


// auth routes
router.get('/',
    auth2Middleware([roles.MERCHANT, roles.ADMIN, roles.MANAGER]),
    getProducts
)

router.get('/getActiveProducts',
    auth2Middleware([roles.MERCHANT, roles.ADMIN, roles.MANAGER]),
    getActiveProducts
)

router.get('/:productId',
    auth2Middleware([roles.MERCHANT, roles.ADMIN, roles.MANAGER]),
    validate([productIdValidator]),
    getProduct
)


router.post('/addProduct',
    auth2Middleware([roles.MERCHANT, roles.ADMIN, roles.MANAGER]),
    validate([productNameValidator, descriptionValidator, stockValidator, isActiveValidator, priceValidator, discountedPriceValidator, imageLinkValidator, categoryIdValidator]),
    dbValidate([storeExist, productNameAlreadyExist]),
    addProductController
)

router.put('/updateProduct',
    auth2Middleware([roles.MERCHANT, roles.ADMIN, roles.MANAGER]),
    validate([productNameValidator, descriptionValidator, stockValidator, isActiveValidator, priceValidator, discountedPriceValidator, imageLinkValidator, categoryIdValidator, productIdValidator]),
    dbValidate([productNameValidateForUpdate]),
    updateProduct
)

router.delete('/deleteProduct',
    auth2Middleware([roles.MERCHANT, roles.ADMIN, roles.MANAGER]),
    validate([productIdValidator]),
    deleteProduct
)

module.exports = router