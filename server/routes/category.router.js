const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/api/v1/product-category' })

const authMiddleware = require('../middleware/auth.middleware')
const validate = require('../middleware/validate.middleware');
const dbValidate = require('../middleware/dbValidate.middleware')

const { categoryNameValidator, categoryIdValidator } = require('../validators/product.validator');
const { storeIdValidator } = require('../validators/store.validator');
const { getCategories, deleteCategory, addCategoryController, updateCategory } = require('../controller/category.controller');
const { storeIdExist } = require('../db.validators/store.db.validator');
const { categoryAlreadyExist, categoryNameValidateForUpdate } = require('../db.validators/product.db.validator');
const getMerchantStoreId = require('../middleware/store.middleware');
const allowedRoles = require('../middleware/role.middleware');
const roles = require('../constants/roles');
const auth2Middleware = require('../middleware/auth2.middleware');
const { storeExist } = require('../db.validators/auth.db.validator');

router.get('/',
    auth2Middleware([roles.MERCHANT, roles.ADMIN, roles.MANAGER]),
    getCategories
)

router.post('/addCategory',
    auth2Middleware([roles.MERCHANT, roles.ADMIN, roles.MANAGER]),
    validate([categoryNameValidator]),
    dbValidate([storeExist, categoryAlreadyExist]),
    addCategoryController
)

router.put('/updateCategory',
    auth2Middleware([roles.MERCHANT, roles.ADMIN, roles.MANAGER]),
    validate([categoryIdValidator, categoryNameValidator]),
    dbValidate([categoryNameValidateForUpdate]),
    updateCategory
)

router.delete('/deleteCategory',
    auth2Middleware([roles.MERCHANT, roles.ADMIN, roles.MANAGER]),
    validate([categoryIdValidator]),
    deleteCategory
)

module.exports = router