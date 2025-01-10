import KoaRouter from "koa-router";
const router = new KoaRouter({ prefix: "/api/v1/product-category" });

import roles from "../constants/roles";
import auth2Middleware from "../middleware/auth2.middleware";
import validate from "../middleware/validate.middleware";

import dbValidate from "../middleware/dbValidate.middleware";

import {
  categoryNameValidator,
  categoryIdValidator,
  pageNoValidator,
} from "../validators/product.validator";
import {
  getCategories,
  deleteCategory,
  addCategoryController,
  updateCategory,
} from "../controller/category.controller";
import {
  categoryAlreadyExist,
  categoryNameValidateForUpdate,
  isMerchantCategory,
} from "../db.validators/product.db.validator";
import { storeExist } from "../db.validators/auth.db.validator";
import { storeLinkValidator } from "../validators/store.validator";
import { getStoreId } from "../middleware/store.middleware";
import { getCategoryProducts } from "../controller/product.controller";

// no auth routes
router.get("/c", validate([storeLinkValidator]), getStoreId, getCategories);

router.get(
  "/c/:categoryId",
  validate([categoryIdValidator, storeLinkValidator]),
  getStoreId,
  getCategoryProducts
);

// auth routes
router.get(
  "/",
  auth2Middleware([roles.MERCHANT, roles.ADMIN, roles.MANAGER]),
  getCategories
);

router.post(
  "/addCategory",
  auth2Middleware([roles.MERCHANT, roles.ADMIN, roles.MANAGER]),
  validate([categoryNameValidator]),
  dbValidate([storeExist, categoryAlreadyExist]),
  addCategoryController
);

router.put(
  "/updateCategory",
  auth2Middleware([roles.MERCHANT, roles.ADMIN, roles.MANAGER]),
  validate([categoryIdValidator, categoryNameValidator]),
  dbValidate([isMerchantCategory, categoryNameValidateForUpdate]),
  updateCategory
);

router.delete(
  "/deleteCategory",
  auth2Middleware([roles.MERCHANT, roles.ADMIN, roles.MANAGER]),
  validate([categoryIdValidator]),
  deleteCategory
);

router.get(
  "/:categoryId",
  auth2Middleware([roles.MERCHANT, roles.ADMIN, roles.MANAGER]),
  validate([categoryIdValidator]),
  getCategories
);

export default router;
