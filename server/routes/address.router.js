const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/api/v1/customer/address' })

const authMiddleware = require('../middleware/auth.middleware')
const validate = require('../middleware/validate.middleware')

const { cityValidator, stateValidator, countryValidator } = require('../validators/store.validator')
const { addressValidator, addressIdValidator } = require('../validators/address.validator')

const { getAddressController, addAddressController, deleteAddressController } = require('../controller/address.controller')
const allowedRoles = require('../middleware/role.middleware')
const roles = require('../constants/roles')


router.get('/',
    authMiddleware,
    allowedRoles([roles.CUSTOMER]),
    getAddressController
)

router.post('/addAddress',
    authMiddleware,
    allowedRoles([roles.CUSTOMER]),
    validate([addressValidator, cityValidator, stateValidator, countryValidator]),
    addAddressController
)

router.delete('/deleteAddress',
    authMiddleware,
    allowedRoles([roles.CUSTOMER]),
    validate([addressIdValidator]),
    deleteAddressController
)

module.exports = router