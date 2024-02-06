import KoaRouter from 'koa-router'
const router = new KoaRouter({ prefix: '/api/v1/staff' })

import roles from '../constants/roles'
import auth2Middleware from '../middleware/auth2.middleware'
import validate from '../middleware/validate.middleware'
import dbValidate from '../middleware/dbValidate.middleware'

import { inviteStaff, acceptInvitation } from '../controller/staff.controller'
import { emailValidator, firstNameValidator, lastNameValidator, passwordValidator, confirmPasswordValidator } from '../validators/auth.validator'
import { staffRoleValidator } from '../validators/staff.validator'
import { emailExistValidator, storeExist } from '../db.validators/auth.db.validator'
import { invitedStaffExists, verifyStaffToken } from '../db.validators/staff.db.validator'


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

export default router