const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/api/v1/customer/auth' })

const validate = require('../middleware/validate.middleware')
const dbValidate = require('../middleware/dbValidate.middleware')

const { emailValidator, passwordValidator, firstNameValidator, confirmPasswordValidator, lastNameValidator } = require('../validators/auth.validator')

const { emailExistValidator, emailDoesntExistValidator } = require('../db.validators/customerAuth.db.validator')
const { cityValidator, stateValidator, countryValidator, storeLinkValidator } = require('../validators/store.validator')
const { loginController, signupController, signInController, verifyLoginLinkController } = require('../controller/customerAuth.controller')
const auth2Middleware = require('../middleware/auth2.middleware')
const roles = require('../constants/roles')
const { storeLinkExist } = require('../db.validators/store.db.validator')


router.post('/signin',
    validate([emailValidator, storeLinkValidator]),
    dbValidate([storeLinkExist]),
    signInController
)

router.get('/verifyLoginLink',
    auth2Middleware([roles.CUSTOMER]),
    // dbValidate([]),
    verifyLoginLinkController
)


// router.post('/login',
//     validate([emailValidator, passwordValidator]),
//     dbValidate([emailDoesntExistValidator]),
//     loginController
// )

// router.post('/signup',
//     validate([firstNameValidator, lastNameValidator, emailValidator, passwordValidator, confirmPasswordValidator, cityValidator, stateValidator, countryValidator]),
//     dbValidate([emailExistValidator]),
//     signupController
// )

module.exports = router