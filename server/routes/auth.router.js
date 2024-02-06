const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/api/v1/auth' })

const authMiddleware = require('../middleware/auth.middleware')

const validate = require("../middleware/validate.middleware")
const { emailValidator, passwordValidator, firstNameValidator, confirmPasswordValidator, lastNameValidator, oldPasswordValidator } = require('../validators/auth.validator')

const { emailExistValidator, emailDoesntExistValidator, unexpiredTokenExist, findStaffAndVerifyPassword } = require('../db.validators/auth.db.validator')
const dbValidate = require('../middleware/dbValidate.middleware')
const getMerchantStoreId = require('../middleware/store.middleware')
const { loginController, signupController, changePasswordController, sendResetLink, verifyResetToken } = require('../controller/auth.controller')
const roles = require('../constants/roles')
const auth2Middleware = require('../middleware/auth2.middleware')

router.get('/getProducts',
    auth2Middleware([roles.CUSTOMER]),
    ctx => {
        ctx.body = [{ name: "Speaker", price: 899, company: "boAt", desc: "boAt speaker" }, { name: "Phone", price: 9999, company: "Samsung", desc: "Samsung phone A12" }]
    }
)

// router.post('/c/login',
//     validate([emailValidator, passwordValidator]),
//     dbValidate([emailDoesntExistValidator]),
//     loginController
// )

router.post('/login',
    validate([emailValidator, passwordValidator]),
    dbValidate([emailDoesntExistValidator]),
    loginController
)

router.post('/signup',
    validate([firstNameValidator, lastNameValidator, emailValidator, passwordValidator, confirmPasswordValidator]),
    dbValidate([emailExistValidator]),
    signupController
)



router.post('/changePassword',
    auth2Middleware([roles.MERCHANT, roles.ADMIN, roles.MANAGER, roles.STAFF]),
    validate([oldPasswordValidator, passwordValidator, confirmPasswordValidator]),
    dbValidate([findStaffAndVerifyPassword]),
    changePasswordController
)

router.post('/sendResetLink',
    // auth2Middleware([roles.MERCHANT, roles.ADMIN, roles.STAFF]),
    validate([emailValidator]),
    dbValidate([emailDoesntExistValidator]),
    sendResetLink
)

router.post('/verifyResetToken',
    auth2Middleware([roles.MERCHANT, roles.ADMIN, roles.STAFF, 10]),
    validate([passwordValidator, confirmPasswordValidator]),
    dbValidate([unexpiredTokenExist]),
    verifyResetToken
)

module.exports = router