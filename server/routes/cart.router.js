import KoaRouter from 'koa-router'
const router = new KoaRouter({ prefix: "/api/v1/customer/cart" })

import roles from '../constants/roles'
import auth2Middleware from '../middleware/auth2.middleware'
import validate from '../middleware/validate.middleware'

import authMiddleware from '../middleware/auth.middleware'
import allowedRoles from '../middleware/role.middleware'

import { productIdValidator } from '../validators/product.validator'
import { getCustomerCart, addToCartController, removeCartItem } from '../controller/cart.controller'
import { customerIdValidator } from '../validators/customer.validator'
import { quantityValidator } from '../validators/cart.validator'
import dbValidate from '../middleware/dbValidate.middleware'
import { productIdExist } from '../db.validators/product.db.validator'



router.get("/",
    auth2Middleware([roles.CUSTOMER]),
    getCustomerCart
);

router.post('/addToCart',
    auth2Middleware([roles.CUSTOMER]),
    validate([productIdValidator, quantityValidator]),
    dbValidate([productIdExist]),
    addToCartController
)

router.patch('/removeItem',
    auth2Middleware([roles.CUSTOMER]),
    validate([productIdValidator]),
    // dbValidate([productIdExist]),
    removeCartItem
)

export default router