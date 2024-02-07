import { ObjectId } from "mongodb"
import { findCategory } from "../mongodb/category"
import { findProduct, findProductByStore, findProductById } from "../mongodb/product"

const categoryAlreadyExist = async (ctx) => {
    let err = null, filter;
    let { category_name } = ctx.request.body

    category_name = category_name.trim()
    const storeId = ctx.user.store_id;

    filter = { category_name, store_id: new ObjectId(storeId) }

    const resp = await findCategory(filter)

    if (resp) {
        err = { success: false, data: resp, msg: "Category name already exist" }
        return err
    }
    return err
}

const categoryNameValidateForUpdate = async (ctx) => {
    let err = null, filter;
    let { category_id, category_name } = ctx.request.body

    category_id = category_id.trim()
    category_name = category_name.trim()
    const storeId = ctx.user.store_id;

    // const x = await findCategory({ _id: new ObjectId(category_id), store_id: new ObjectId(storeId) })

    const regex = new RegExp(category_id)
    filter = { $and: [{ store_id: new ObjectId(storeId) }, { category_name }, { _id: { $ne: new ObjectId(category_id) } }] }

    const resp = await findCategory(filter)

    if (resp) {
        err = { success: false, data: resp, msg: "Category name already exist" }
        return err
    }

    return err
}

// for update update
const isMerchantCategory = async (ctx) => {
    let err = null, filter;
    let { category_id, category_name } = ctx.request.body

    if (category_name) {
        category_name = category_name.trim()
    }

    category_id = category_id.trim()
    const storeId = ctx.user.store_id;

    const regex = new RegExp(category_id)
    filter = { store_id: new ObjectId(storeId), _id: new ObjectId(category_id) }

    const resp = await findCategory(filter)

    if (!resp) {
        err = { success: false, data: resp, msg: "Category doesnt exist" }
        return err
    }

    return err
}

const productNameAlreadyExist = async (ctx) => {
    let err = null, filter
    let { product_name } = ctx.request.body


    product_name = product_name.trim()
    const storeId = ctx.user.store_id

    filter = { product_name, store_id: new ObjectId(storeId) }

    const resp = await findProduct(filter)

    if (resp) {
        err = { success: false, data: resp, msg: "Product name already exist" }
        return err
    }
    return err
}

const productNameValidateForUpdate = async (ctx) => {
    let err = null, filter;
    let { product_id, product_name } = ctx.request.body

    product_id = product_id.trim()
    product_name = product_name.trim()
    const storeId = ctx.user.store_id;

    const regex = new RegExp(product_id)
    filter = { $and: [{ store_id: new ObjectId(storeId) }, { product_name }, { _id: { $ne: new ObjectId(product_id) } }] }


    const resp = await findProduct(filter)

    if (resp) {
        err = { success: false, data: resp, msg: "Product name already exist" }
        return err
    }
    return err
}

// for product update
const isMerchantProduct = async (ctx) => {
    let err = null, filter;
    let { product_id, product_name } = ctx.request.body

    product_id = product_id.trim()
    product_name = product_name.trim()
    const storeId = ctx.user.store_id;

    const regex = new RegExp(product_id)
    filter = { store_id: new ObjectId(storeId), _id: new ObjectId(product_id) }


    const resp = await findProduct(filter)

    if (!resp) {
        err = { success: false, data: resp, msg: "Product doesnt exist" }
        return err
    }
    return err
}

const productIdExist = async (ctx) => {
    let err = null
    const product_id = ctx.request.body.product_id.trim()
    const store_id = ctx.user.store_id;

    const resp = await findProductById(product_id, store_id)

    if (!resp) {
        err = { success: false, data: resp, msg: "Product Id doesnt exist" }
        return err
    }
    return err
}

export { categoryAlreadyExist, productNameAlreadyExist, productNameValidateForUpdate, productIdExist, categoryNameValidateForUpdate, isMerchantCategory, isMerchantProduct }