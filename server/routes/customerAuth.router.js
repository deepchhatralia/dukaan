import KoaRouter from 'koa-router'
const router = new KoaRouter({ prefix: '/api/v1/customer/auth' })

import roles from '../constants/roles'
import auth2Middleware from '../middleware/auth2.middleware'

import validate from '../middleware/validate.middleware'
import dbValidate from '../middleware/dbValidate.middleware'

import { emailValidator, passwordValidator, firstNameValidator, confirmPasswordValidator, lastNameValidator } from '../validators/auth.validator'

import { emailExistValidator, emailDoesntExistValidator } from '../db.validators/customerAuth.db.validator'
import { cityValidator, stateValidator, countryValidator, storeLinkValidator } from '../validators/store.validator'
import { loginController, signupController, signInController, verifyLoginLinkController } from '../controller/customerAuth.controller'
import { storeLinkExist } from '../db.validators/store.db.validator'


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

export default router