import KoaRouter from "koa-router";
const router = new KoaRouter({ prefix: "/api/v1/store" });

import roles from "../constants/roles";
import auth2Middleware from "../middleware/auth2.middleware";

import validate from "../middleware/validate.middleware";
import dbValidate from "../middleware/dbValidate.middleware";

import {
  nameValidator,
  contactValidator,
  isOpenValidator,
  merchantIdValidator,
  storeIdValidator,
  cityValidator,
  stateValidator,
  countryValidator,
  storeLinkValidator,
} from "../validators/store.validator";
import {
  storeLinkExistValidator,
  merchantIdExistInUser,
  storeAlreadyExist,
} from "../db.validators/store.db.validator";
import {
  addStore,
  getMerchantStore,
  deleteStore,
  updateStore,
  getMerchantStoreById,
} from "../controller/store.controller";

// get all stores of merchant
router.post("/", auth2Middleware([roles.MERCHANT]), getMerchantStore);

router.get(
  "/:storeId",
  auth2Middleware([roles.MERCHANT]),
  validate([storeIdValidator]),
  getMerchantStoreById
);

router.post(
  "/addStore",
  auth2Middleware([roles.MERCHANT]),
  validate([
    nameValidator,
    storeLinkValidator,
    contactValidator,
    isOpenValidator,
    cityValidator,
    stateValidator,
    countryValidator,
  ]),
  dbValidate([storeAlreadyExist, storeLinkExistValidator]),
  addStore
);

router.put(
  "/updateStore",
  auth2Middleware([roles.MERCHANT]),
  validate([
    storeLinkValidator,
    storeIdValidator,
    nameValidator,
    contactValidator,
    isOpenValidator,
    cityValidator,
    stateValidator,
    countryValidator,
  ]),
  dbValidate([storeLinkExistValidator]),
  updateStore
);

router.delete(
  "/deleteStore",
  auth2Middleware([roles.MERCHANT]),
  validate([storeIdValidator]),
  deleteStore
);

export default router;
