const KoaRouter = require('koa-router')
const router = new KoaRouter({ prefix: '/api' })
const jwt = require('jsonwebtoken')

const verify = require('../middleware/verifyToken')

const User = require('../model/User')
const client = require('../config/db.config')
const { loginController, signupController } = require('../controller')

const dbName = "test"
const collectionName = "users"
const SECRET_VALUE = process.env.ACCESS_TOKEN_SECRET_VALUE

// ctx.body = ctx.req.headers

router.get('/getProducts', verify, ctx => {
    ctx.body = { user: ctx.req.user }
})

router.post('/login', loginController)
router.post('/signup', signupController)

module.exports = router