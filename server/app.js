import dotenv from "dotenv";
dotenv.config();

import koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "koa-cors";

const app = new koa();

const PORT = process.env.PORT;

import {
  authRouter,
  staffRouter,
  storeRouter,
  categoryRouter,
  productRouter,
  customerRouter,
  addressRouter,
  cartRouter,
  orderRouter,
} from "./routes";

app.use(cors());
app.use(bodyParser());

app.use(authRouter.routes()).use(authRouter.allowedMethods());
app.use(staffRouter.routes()).use(staffRouter.allowedMethods());
app.use(storeRouter.routes()).use(storeRouter.allowedMethods());
app.use(categoryRouter.routes()).use(categoryRouter.allowedMethods());
app.use(productRouter.routes()).use(productRouter.allowedMethods());

app.use(customerRouter.routes()).use(customerRouter.allowedMethods());
app.use(addressRouter.routes()).use(addressRouter.allowedMethods());
app.use(cartRouter.routes()).use(cartRouter.allowedMethods());
app.use(orderRouter.routes()).use(orderRouter.allowedMethods());

app.use((ctx) => {
  ctx.status = 404;
  ctx.body = "Page not found...";
});

app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`));
