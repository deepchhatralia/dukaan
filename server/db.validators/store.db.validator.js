const { findStaffById } = require("../mongodb/staff");
const { findStoreByLink, findStoreById, findMerchantStore } = require("../mongodb/store");

const storeLinkExistValidator = async (ctx) => {
    let err = null;

    const storeLink = ctx.request.body.store_link;

    const resp = await findStoreByLink(storeLink);

    if (resp) {
        err = { success: false, message: "Store link already exist" }
        return err
    }
    return err
}

const storeAlreadyExist = async (ctx) => {
    let err = null;

    const merchant_id = ctx.user._id;

    const resp = await findMerchantStore(merchant_id);

    if (resp) {
        err = { success: false, message: "1 store already exist" }
        return err
    }
    return err
}

const storeIdExist = async (ctx) => {
    let err = null;

    const merchant_id = ctx.user._id

    const store_id = ctx.user.storeId;

    const resp = await findStoreById(store_id, merchant_id);

    if (!resp) {
        err = { success: false, message: "Store Id doesnt exist" }
        return err
    }
    return err
}

const merchantIdExistInUser = async (ctx) => {
    let err = null

    let { merchantId } = ctx.request.body

    if (!merchantId) {
        merchantId = ctx.request.body.merchant_id;
    }

    const resp = await findStaffById(merchantId)

    if (!resp) {
        err = { success: false, message: "Merchant id doesnt exist" }
        return err
    }
    return err
}

module.exports = { storeLinkExistValidator, merchantIdExistInUser, storeIdExist, storeAlreadyExist }