const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/api/v1/staff' })

const authMiddleware = require('../middleware/auth.middleware')
const auth2Middleware = require('../middleware/auth2.middleware')

const { inviteStaff, acceptInvitation } = require('../controller/staff.controller')
const validate = require('../middleware/validate.middleware')
const { emailValidator, firstNameValidator, lastNameValidator, passwordValidator, confirmPasswordValidator } = require('../validators/auth.validator')
const { staffRoleValidator } = require('../validators/staff.validator')
const roles = require('../constants/roles')
const dbValidate = require('../middleware/dbValidate.middleware')
const { emailExistValidator, storeExist } = require('../db.validators/auth.db.validator')
const { invitedStaffExists, verifyStaffToken } = require('../db.validators/staff.db.validator')


router.post('/inviteStaff',
    auth2Middleware([roles.MERCHANT]),
    validate([emailValidator, staffRoleValidator]),
    dbValidate([emailExistValidator, storeExist]),  // cannot invite staff if email already registered  or store doesnt exist
    inviteStaff
)

router.post('/verifyToken/:token',
    dbValidate([verifyStaffToken]),
    validate([firstNameValidator, lastNameValidator, passwordValidator, confirmPasswordValidator]),
    dbValidate([invitedStaffExists]),
    acceptInvitation
)

module.exports = router