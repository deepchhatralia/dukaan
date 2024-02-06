import dotenv from 'dotenv'
dotenv.config()

import koa from 'koa'
import json from 'koa-json'
import bodyParser from 'koa-bodyparser'
import cors from 'koa-cors'

const app = new koa()
import { init } from './config/db.config'

const PORT = process.env.PORT;

import {
    authRouter, staffRouter, storeRouter, categoryRouter, productRouter,
    customerRouter, addressRouter, cartRouter, orderRouter
} from './routes'

import KoaRouter from 'koa-router'
const router = new KoaRouter()

console.log(router.get)

router.get('/', ctx => ctx.body = "Hello World")

app.use(cors())
app.use(bodyParser())

app.use(authRouter.routes()).use(authRouter.allowedMethods())
app.use(staffRouter.routes()).use(staffRouter.allowedMethods())
app.use(storeRouter.routes()).use(storeRouter.allowedMethods())
app.use(categoryRouter.routes()).use(categoryRouter.allowedMethods())
app.use(productRouter.routes()).use(productRouter.allowedMethods())

app.use(customerRouter.routes()).use(customerRouter.allowedMethods())
app.use(addressRouter.routes()).use(addressRouter.allowedMethods())
app.use(cartRouter.routes()).use(cartRouter.allowedMethods())
app.use(orderRouter.routes()).use(orderRouter.allowedMethods())


app.use((ctx) => {
    ctx.status = 404
    ctx.body = "Page not found..."
})


init((err, db) => {
    if (err) {
        console.log(err);
        return;
    }
    app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`))
})