const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/api/v1/staff' })

const authMiddleware = require('../middleware/auth.middleware')

const { inviteStaff, verifyStaffToken } = require('../controller/staff.controller')
const validate = require('../middleware/validate.middleware')
const { emailValidator, firstNameValidator, lastNameValidator, passwordValidator, confirmPasswordValidator } = require('../validators/auth.validator')
const { staffRoleValidator } = require('../validators/staff.validator')


router.post('/inviteStaff',
    authMiddleware,
    validate([emailValidator, staffRoleValidator]),
    inviteStaff
)

router.post('/verifyToken',
    authMiddleware,
    validate([firstNameValidator, lastNameValidator, passwordValidator, confirmPasswordValidator]),
    verifyStaffToken
)

module.exports = router