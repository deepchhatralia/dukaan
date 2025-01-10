import KoaRouter from "koa-router";
const router = new KoaRouter({ prefix: "/api/v1/product" });

import roles from "../constants/roles";
import auth2Middleware from "../middleware/auth2.middleware";
import validate from "../middleware/validate.middleware";
import dbValidate from "../middleware/dbValidate.middleware";

import {
  productNameValidator,
  descriptionValidator,
  stockValidator,
  isActiveValidator,
  priceValidator,
  discountedPriceValidator,
  imageLinkValidator,
  categoryIdValidator,
  productIdValidator,
  oldProductNameValidator,
  pageNoValidator,
  sortByValidator,
} from "../validators/product.validator";

import {
  getProducts,
  addProductController,
  deleteProduct,
  updateProduct,
  getProduct,
  getActiveProducts,
  getProductsByStoreLink,
} from "../controller/product.controller";
import {
  isMerchantCategory,
  isMerchantProduct,
  productNameAlreadyExist,
  productNameValidateForUpdate,
} from "../db.validators/product.db.validator";
import { storeExist } from "../db.validators/auth.db.validator";
import { getStoreId } from "../middleware/store.middleware";
import { storeLinkValidator } from "../validators/store.validator";

// unauth routes
router.get("/c", validate([storeLinkValidator]), getStoreId, getActiveProducts);

router.get(
  "/c/:productId",
  validate([productIdValidator, storeLinkValidator]),
  getStoreId,
  getProduct
);

// auth routes
router.get(
  "/",
  auth2Middleware([roles.MERCHANT, roles.ADMIN, roles.MANAGER]),
  getProducts
);

router.get(
  "/getActiveProducts",
  auth2Middleware([roles.MERCHANT, roles.ADMIN, roles.MANAGER]),
  validate([sortByValidator]),
  getActiveProducts
);

router.get(
  "/:productId",
  auth2Middleware([roles.MERCHANT, roles.ADMIN, roles.MANAGER]),
  validate([productIdValidator]),
  getProduct
);

router.post(
  "/addProduct",
  auth2Middleware([roles.MERCHANT, roles.ADMIN, roles.MANAGER]),
  validate([
    productNameValidator,
    descriptionValidator,
    stockValidator,
    isActiveValidator,
    priceValidator,
    discountedPriceValidator,
    imageLinkValidator,
    categoryIdValidator,
  ]),
  dbValidate([storeExist, isMerchantCategory, productNameAlreadyExist]),
  addProductController
);

router.put(
  "/updateProduct",
  auth2Middleware([roles.MERCHANT, roles.ADMIN, roles.MANAGER]),
  validate([
    productNameValidator,
    descriptionValidator,
    stockValidator,
    isActiveValidator,
    priceValidator,
    discountedPriceValidator,
    imageLinkValidator,
    categoryIdValidator,
    productIdValidator,
  ]),
  dbValidate([
    isMerchantCategory,
    isMerchantProduct,
    productNameValidateForUpdate,
  ]),
  updateProduct
);

router.delete(
  "/deleteProduct",
  auth2Middleware([roles.MERCHANT, roles.ADMIN, roles.MANAGER]),
  validate([productIdValidator]),
  deleteProduct
);

export default router;
