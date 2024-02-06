const KoaRouter = require('koa-router');
const router = new KoaRouter({ prefix: "/api/v1/customer/cart" });
const roles = require('../constants/roles');

const authMiddleware = require('../middleware/auth.middleware');
const allowedRoles = require('../middleware/role.middleware');
const validate = require('../middleware/validate.middleware');

const { productIdValidator } = require('../validators/product.validator');
const { getCustomerCart, addToCartController, removeCartItem } = require('../controller/cart.controller');
const { customerIdValidator } = require('../validators/customer.validator');
const { quantityValidator } = require('../validators/cart.validator');
const dbValidate = require('../middleware/dbValidate.middleware');
const { productIdExist } = require('../db.validators/product.db.validator');
const getMerchantStoreId = require('../middleware/store.middleware');



router.get("/",
    authMiddleware,
    allowedRoles([roles.CUSTOMER]),
    getCustomerCart
);

router.post('/addToCart',
    authMiddleware,
    allowedRoles([roles.CUSTOMER]),
    // getMerchantStoreId,
    validate([productIdValidator, quantityValidator]),
    dbValidate([productIdExist]),
    addToCartController
)

router.patch('/removeItem',
    authMiddleware,
    allowedRoles([roles.CUSTOMER]),
    // getMerchantStoreId,
    validate([productIdValidator]),
    // dbValidate([productIdExist]),
    removeCartItem
)

module.exports = router