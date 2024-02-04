const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/api/v1/product' })

const authMiddleware = require('../middleware/auth.middleware')
const validate = require('../middleware/validate.middleware')
const dbValidate = require('../middleware/dbValidate.middleware')
const getMerchantStoreId = require('../middleware/store.middleware');

const { productNameValidator, descriptionValidator, stockValidator, isActiveValidator, priceValidator, discountedPriceValidator, imageLinkValidator, categoryIdValidator, productIdValidator } = require('../validators/product.validator');

const { getProducts, addProductController, deleteProduct, updateProduct, getProduct, getActiveProducts, getProductsByStoreLink } = require('../controller/product.controller');
const { productNameAlreadyExist } = require('../db.validators/product.db.validator')
const allowedRoles = require('../middleware/role.middleware')
const roles = require('../constants/roles')
const { storeLinkValidator } = require('../validators/store.validator')


// seperate route to get products  because it does not require token (without login or signup)
// router.get('/',
//     validate([storeLinkValidator]),
//     dbValidate(),
//     getProductsByStoreLink
// )


router.get('/',
    authMiddleware,
    getMerchantStoreId,
    getProducts
)

router.get('/getActiveProducts',
    authMiddleware,
    getMerchantStoreId,
    // validate([productIdValidator]),
    getActiveProducts
)

router.get('/:productId',
    authMiddleware,
    getMerchantStoreId,
    validate([productIdValidator]),
    getProduct
)


router.post('/addProduct',
    authMiddleware,
    getMerchantStoreId,
    validate([productNameValidator, descriptionValidator, stockValidator, isActiveValidator, priceValidator, discountedPriceValidator, imageLinkValidator, categoryIdValidator]),
    dbValidate([productNameAlreadyExist]),
    addProductController
)

router.put('/updateProduct',
    authMiddleware,
    getMerchantStoreId,
    validate([productNameValidator, descriptionValidator, stockValidator, isActiveValidator, priceValidator, discountedPriceValidator, imageLinkValidator, categoryIdValidator, productIdValidator]),
    dbValidate([productNameAlreadyExist]),
    updateProduct
)

router.delete('/deleteProduct',
    authMiddleware,
    getMerchantStoreId,
    validate([productIdValidator]),
    deleteProduct
)

module.exports = router