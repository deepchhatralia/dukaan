const roles = require('../constants/roles')
const { findStoreByMerchantId, findStoreByLink } = require('../mongodb/store')

const getMerchantStoreId = async (ctx, next) => {
    let store;

    // if (!(ctx.request.body.store_link || ctx?.user)) {
    //     // return next()
    //     ctx.body = { success: false, message: "Specify store link" }
    //     return
    // }
    // else {
    //     ctx.body = { success: false, message: "Specify store link" }
    //     return
    // }

    const userRole = ctx?.user?.role;

    if (userRole === roles.CUSTOMER && ctx.request.body?.store_link) {
        const store_link = ctx.request.body?.store_link.trim()

        store = await findStoreByLink(store_link)
    } else if (userRole === roles.MERCHANT) {
        const merchantId = ctx.user._id

        store = await findStoreByMerchantId(merchantId)
    } else if (userRole === roles.ADMIN || userRole === roles.MANAGER || userRole === roles.STAFF) {
        const invitedMerchantId = ctx.user.invited_merchant_id

        store = await findStoreByMerchantId(invitedMerchantId)
    } else {
        ctx.body = { success: false, message: "Specify store link" }
        return
    }

    if (!store) {
        ctx.body = { success: false, message: "No store found" }
        return
    }

    ctx.user["storeId"] = store._id

    await next()
}

module.exports = getMerchantStoreId