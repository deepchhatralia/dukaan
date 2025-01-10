import { findStaffById } from "../mongodb/staff";
import {
  findStoreByLink,
  findStoreById,
  findStoreByMerchantId,
} from "../mongodb/store";

const storeLinkExistValidator = async (ctx) => {
  let err = null;

  const storeLink = ctx.request.body.store_link;

  const resp = await findStoreByLink(storeLink);

  if (resp) {
    err = { success: false, message: "Store link already exist" };
    return err;
  }
  return err;
};

const storeAlreadyExist = async (ctx) => {
  let err = null;

  const merchant_id = ctx.user._id;

  const resp = await findStoreByMerchantId(merchant_id);

  if (resp) {
    err = { success: false, message: "1 store already exist" };
    return err;
  }
  return err;
};

const storeIdExist = async (ctx) => {
  let err = null;

  const merchant_id = ctx.user._id;

  const store_id = ctx.user.store_id;

  const resp = await findStoreById(store_id, merchant_id);

  if (!resp) {
    err = { success: false, message: "Store Id doesnt exist" };
    return err;
  }
  return err;
};

const merchantIdExistInUser = async (ctx) => {
  let err = null;

  let { merchantId } = ctx.request.body;

  if (!merchantId) {
    merchantId = ctx.request.body.merchant_id;
  }

  const resp = await findStaffById(merchantId);

  if (!resp) {
    err = { success: false, message: "Merchant id doesnt exist" };
    return err;
  }
  return err;
};

const storeLinkExist = async (ctx) => {
  let err = null;

  const storeLink = ctx.request.body?.store_link;

  const store = await findStoreByLink(storeLink);

  if (!store) {
    err = { success: false, msg: "Store doesnt exist" };
    return err;
  }
  return err;
};

export {
  storeLinkExistValidator,
  merchantIdExistInUser,
  storeIdExist,
  storeAlreadyExist,
  storeLinkExist,
};
