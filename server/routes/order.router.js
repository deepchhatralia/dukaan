import KoaRouter from 'koa-router'
const router = new KoaRouter({ prefix: '/api/v1/customer/order' })

import auth2Middleware from '../middleware/auth2.middleware'
import validate from '../middleware/validate.middleware'
import roles from '../constants/roles'



// for seller 
// router.get('/',
//     auth2Middleware([roles.MERCHANT])
// )

export default router