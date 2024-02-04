const KoaRouter = require('koa-router');
const router = new KoaRouter({ prefix: "/api/v1/customer/cart" });
const roles = require('../constants/roles');

const authMiddleware = require('../middleware/auth.middleware');
const allowedRoles = require('../middleware/role.middleware');
const validate = require('../middleware/validate.middleware');

const { productIdValidator } = require('../validators/product.validator');
const { getCustomerCart } = require('../controller/cart.controller');
const { customerIdValidator } = require('../validators/customer.validator');



router.get("/",
    authMiddleware,
    allowedRoles([roles.CUSTOMER]),
    validate([customerIdValidator]),
    getCustomerCart
);

// router.post("/add-to-cart",
//     authMiddleware,
//     isBuyer,
//     addToCart
// );

// router.post("/delete-from-cart/:productId",
//     authMiddleware,
//     isBuyer
// );

module.exports = router