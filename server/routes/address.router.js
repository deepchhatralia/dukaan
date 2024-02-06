import KoaRouter from 'koa-router'
const router = new KoaRouter({ prefix: '/api/v1/customer/address' })

import roles from '../constants/roles'
import auth2Middleware from '../middleware/auth2.middleware'
import validate from '../middleware/validate.middleware'

import { cityValidator, stateValidator, countryValidator } from '../validators/store.validator'
import { addressValidator, addressIdValidator } from '../validators/address.validator'

import { getAddressController, addAddressController, deleteAddressController, updateAddressController } from '../controller/address.controller'


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

export default router