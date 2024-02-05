require('dotenv').config();
const koa = require('koa')
const json = require('koa-json')
const bodyParser = require('koa-bodyparser')
const cors = require('koa-cors')

const app = new koa()
const client = require('./config/db.config')

const PORT = process.env.PORT;

const {
    authRouter, staffRouter, storeRouter, categoryRouter, productRouter,
    customerRouter, addressRouter, cartRouter, orderRouter
} = require('./routes')


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


client.init((err, db) => {
    if (err) {
        console.log(err);
        return;
    }
    app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`))
})