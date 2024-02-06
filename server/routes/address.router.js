const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/api/v1/customer/address' })

const authMiddleware = require('../middleware/auth.middleware')
const validate = require('../middleware/validate.middleware')

const { cityValidator, stateValidator, countryValidator } = require('../validators/store.validator')
const { addressValidator, addressIdValidator } = require('../validators/address.validator')

const { getAddressController, addAddressController, deleteAddressController, updateAddressController } = require('../controller/address.controller')
const allowedRoles = require('../middleware/role.middleware')
const roles = require('../constants/roles')
const auth2Middleware = require('../middleware/auth2.middleware')


router.get('/',
    auth2Middleware([roles.CUSTOMER]),
    getAddressController
)

router.post('/addAddress',
    auth2Middleware([roles.CUSTOMER]),
    validate([addressValidator, cityValidator, stateValidator, countryValidator]),
    addAddressController
)


router.put('/updateAddress',
    auth2Middleware([roles.CUSTOMER]),
    validate([addressIdValidator, addressValidator, cityValidator, stateValidator, countryValidator]),
    updateAddressController
)

router.delete('/deleteAddress',
    auth2Middleware([roles.CUSTOMER]),
    validate([addressIdValidator]),
    deleteAddressController
)

module.exports = router