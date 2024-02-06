import roles from '../constants/roles'
import { findStoreByMerchantId, findStoreByLink } from '../mongodb/store'

const getMerchantStoreId = async (ctx, next) => {
    let store;

    const userRole = ctx?.user?.role;

    if ((userRole === roles.CUSTOMER || !userRole) && ctx.request.body?.store_link) {
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
    console.log(store)

    ctx.user["storeId"] = store._id

    await next()
}

const getStoreLink = (ctx, next) => {
    const storeLink = ctx.request.body?.storeLink

    if (!storeLink) {
        ctx.body = { success: false, msg: "Specify store link" }
        return
    }
    next()
}

export default getMerchantStoreId