const { ObjectId } = require("mongodb");
const { insertStore, findStoreByMerchantId, deleteStoreById, updateStoreById, findStoreById } = require("../mongodb/store");
const { getObjectId } = require("../service");
const { updateStaff } = require("../mongodb/staff");

const addStore = async (ctx) => {
    const { _id: userId } = ctx.user

    let { store_link, name, contact, isOpen, city, state, country } = ctx.request.body;

    store_link = store_link.trim()
    name = name.trim()
    city = city.trim()
    state = state.trim()
    country = country.trim()

    const resp = await insertStore({ store_link, name, contact, isOpen, merchant_id: new ObjectId(userId), location: { city, state, country } })

    await updateStaff({ _id: new ObjectId(userId) }, { $set: { store_id: new ObjectId(resp.insertedId) } })

    ctx.body = { success: true, data: resp, msg: "Added" }
}

const getMerchantStore = async (ctx) => {
    // const { merchant_id } = ctx.request.body;
    const { _id: userId } = ctx.user

    const resp = await findStoreByMerchantId(userId)

    if (!resp) {
        ctx.body = { success: false, data: resp, msg: "No stores associated with the merchant" }
        return
    }
    ctx.body = { success: true, data: resp, msg: "Store" }
}

const getMerchantStoreById = async (ctx) => {
    const { _id: userId } = ctx.user

    const store_id = ctx.params.storeId

    const resp = await findStoreById(store_id, userId)

    if (!resp) {
        ctx.body = { success: true, data: resp, msg: "No stores associated with the merchant" }
        return
    }
    ctx.body = { success: true, data: resp, msg: "Store" }
}

const updateStore = async (ctx) => {
    const { _id: userId } = ctx.user
    let { store_id, store_link, name, contact, isOpen, merchant_id, city, state, country } = ctx.request.body;

    store_id = store_id.trim()
    store_link = store_link.trim()
    name = name.trim()
    city = city.trim()
    state = state.trim()
    country = country.trim()

    const resp = await updateStoreById({ store_id, merchant_id: userId }, { store_link, name, contact, isOpen, location: { city, state, country } })

    if (!resp) {
        ctx.body = { success: true, data: resp, msg: "Store ID doesnt exist or Not authorized" }
        return
    }

    ctx.body = { success: true, data: resp, msg: "Updated" }
}

const deleteStore = async (ctx) => {
    const { _id: userId } = ctx.user
    let { store_id } = ctx.request.body
    store_id = store_id.trim()

    const resp = await deleteStoreById(store_id, userId);

    if (resp.deletedCount !== 0) {
        ctx.body = { success: true, msg: "Deleted" }
        return
    }
    ctx.body = { success: false, msg: "Store Id doesnt exist" }
}

module.exports = { addStore, getMerchantStore, getMerchantStoreById, updateStore, deleteStore }