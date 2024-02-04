const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/api/v1/product-category' })

const authMiddleware = require('../middleware/auth.middleware')
const validate = require('../middleware/validate.middleware');
const dbValidate = require('../middleware/dbValidate.middleware')

const { categoryNameValidator, categoryIdValidator } = require('../validators/product.validator');
const { storeIdValidator } = require('../validators/store.validator');
const { getCategories, deleteCategory, addCategoryController, updateCategory } = require('../controller/category.controller');
const { storeIdExist } = require('../db.validators/store.db.validator');
const { categoryAlreadyExist } = require('../db.validators/product.db.validator');
const getMerchantStoreId = require('../middleware/store.middleware');
const allowedRoles = require('../middleware/role.middleware');
const roles = require('../constants/roles');

router.get('/',
    authMiddleware,
    getMerchantStoreId,
    getCategories
)

router.post('/addCategory',
    authMiddleware,
    allowedRoles([roles.CUSTOMER, roles.MERCHANT, roles.ADMIN, roles.MANAGER]),
    getMerchantStoreId,
    validate([categoryNameValidator]),
    dbValidate([categoryAlreadyExist]),
    addCategoryController
)

router.put('/updateCategory',
    authMiddleware,
    allowedRoles([roles.CUSTOMER, roles.MERCHANT, roles.ADMIN, roles.MANAGER]),
    getMerchantStoreId,
    validate([categoryIdValidator, categoryNameValidator]),
    dbValidate([categoryAlreadyExist]),
    updateCategory
)

router.delete('/deleteCategory',
    authMiddleware,
    allowedRoles([roles.CUSTOMER, roles.MERCHANT, roles.ADMIN, roles.MANAGER]),
    getMerchantStoreId,
    validate([categoryIdValidator]),
    deleteCategory
)

module.exports = router