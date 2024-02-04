const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/api/v1/customer/auth' })

const validate = require('../middleware/validate.middleware')
const dbValidate = require('../middleware/dbValidate.middleware')

const { emailValidator, passwordValidator, firstNameValidator, confirmPasswordValidator, lastNameValidator } = require('../validators/auth.validator')

const { emailExistValidator, emailDoesntExistValidator } = require('../db.validators/customerAuth.db.validator')
const { cityValidator, stateValidator, countryValidator } = require('../validators/store.validator')
const { loginController, signupController } = require('../controller/customerAuth.controller')

router.post('/login',
    validate([emailValidator, passwordValidator]),
    dbValidate([emailDoesntExistValidator]),
    loginController
)

router.post('/signup',
    validate([firstNameValidator, lastNameValidator, emailValidator, passwordValidator, confirmPasswordValidator, cityValidator, stateValidator, countryValidator]),
    dbValidate([emailExistValidator]),
    signupController
)

module.exports = router