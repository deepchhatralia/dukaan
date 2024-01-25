require('dotenv').config();
const koa = require('koa')
const json = require('koa-json')
const bodyParser = require('koa-bodyparser')
const cors = require('koa-cors')

const app = new koa()

const client = require('./config/db.config')
const authRouter = require('./routes/auth.routes')
const PORT = process.env.PORT;

app.use(json())
app.use(cors())
app.use(bodyParser())

app.use(authRouter.routes()).use(authRouter.allowedMethods())

app.use((ctx) => {
    ctx.status = 404
    ctx.body = "Page not found..."
    // ctx.body += "hell"
})


client.init((err, db) => {
    if (err) {
        console.log(err);
        return;
    }
    app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`))
})