import KoaRouter from "koa-router";
const router = new KoaRouter({ prefix: "/api/v1/customer/cart" });

import roles from "../constants/roles";
import auth2Middleware from "../middleware/auth2.middleware";
import validate from "../middleware/validate.middleware";
import dbValidate from "../middleware/dbValidate.middleware";
import { getStoreId } from "../middleware/store.middleware";

import { productIdValidator } from "../validators/product.validator";
import {
  getCustomerCart,
  addToCartController,
  removeCartItem,
  clearCartController,
} from "../controller/cart.controller";
import { quantityValidator } from "../validators/cart.validator";
import { productIdExist } from "../db.validators/product.db.validator";
import { storeLinkValidator } from "../validators/store.validator";

router.get(
  "/",
  auth2Middleware([roles.CUSTOMER]),
  validate([storeLinkValidator]),
  getStoreId,
  getCustomerCart
);

router.post(
  "/addToCart",
  auth2Middleware([roles.CUSTOMER]),
  validate([productIdValidator, quantityValidator, storeLinkValidator]),
  getStoreId,
  dbValidate([productIdExist]),
  addToCartController
);

router.patch(
  "/removeItem",
  auth2Middleware([roles.CUSTOMER]),
  validate([productIdValidator]),
  getStoreId,
  dbValidate([productIdExist]),
  removeCartItem
);

router.delete(
  "/clearCart",
  auth2Middleware([roles.CUSTOMER]),
  getStoreId,
  clearCartController
);

export default router;
