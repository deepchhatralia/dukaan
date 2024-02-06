import KoaRouter from 'koa-router'
const router = new KoaRouter({ prefix: '/api/v1/product-category' })

import roles from '../constants/roles'
import auth2Middleware from '../middleware/auth2.middleware'
import validate from '../middleware/validate.middleware'

import dbValidate from '../middleware/dbValidate.middleware'

const { categoryNameValidator, categoryIdValidator } = require('../validators/product.validator');
const { getCategories, deleteCategory, addCategoryController, updateCategory } = require('../controller/category.controller');
const { categoryAlreadyExist, categoryNameValidateForUpdate } = require('../db.validators/product.db.validator');
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

export default router