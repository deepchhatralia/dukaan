const { ObjectId } = require('mongodb')
const { addProduct, deleteProductById, findProductByStore, updateProductById, findProductById, findActiveProducts, findProductByStoreLink, findProductByCategoryId } = require('../mongodb/product')

const getProducts = async (ctx) => {
    const storeId = ctx.user.store_id

    const resp = await findProductByStore(storeId)

    if (!resp.length) {
        ctx.body = { success: false, msg: "No products found" }
        return
    }
    ctx.body = { success: true, data: resp, msg: "Found" }
}

const getCategoryProducts = async (ctx) => {
    const category_id = ctx.request.body.category_id

    const resp = await findProductByCategoryId(category_id)

    if (!resp.length) {
        ctx.body = { success: false, msg: "No products found" }
        return
    }
    ctx.body = { success: true, data: resp, msg: "Found" }
}

// without login or register
const getProductsByStoreLink = async (ctx) => {
    const store_link = ctx.request.body?.store_link.trim()

    const resp = await findProductByStoreLink(store_link);

    if (!resp.length) {
        ctx.body = { success: false, msg: "No products found" }
        return
    }
    ctx.body = { success: true, data: resp, msg: "Found" }
}

const getProduct = async (ctx) => {
    const { productId } = ctx.params

    const storeId = ctx.user.store_id

    const resp = await findProductById(productId, storeId)

    if (!resp) {
        ctx.body = { success: false, msg: "No products found" }
        return
    }
    ctx.body = { success: true, data: resp, msg: "Found" }
}

const getActiveProducts = async (ctx) => {
    const storeId = ctx.user.store_id

    const resp = await findActiveProducts(storeId)

    if (!resp.length) {
        ctx.body = { success: false, msg: "No products found" }
        return
    }

    ctx.body = { success: true, data: resp, msg: "Found" }
}

const getNoAuthActiveProducts = async (ctx) => {
    const storeLink = ctx.request.body.storeLink

    const resp = await findActiveProducts(storeId)

    if (!resp.length) {
        ctx.body = { success: false, msg: "No products found" }
        return
    }

    ctx.body = { success: true, data: resp, msg: "Found" }
}

const addProductController = async (ctx) => {
    let { product_name, product_desc, product_stock, isActive, price, discounted_price, img, category_id } = ctx.request.body

    const storeId = ctx.user.store_id

    product_name = product_name.trim()
    product_desc = product_desc.trim()
    img = img.trim()
    category_id = category_id.trim()

    const resp = await addProduct({ product_name, product_desc, product_stock, isActive, price, discounted_price, img, category_id: new ObjectId(category_id), store_id: new ObjectId(storeId) })

    ctx.body = { success: true, msg: "Added" }
}

const deleteProduct = async (ctx) => {
    let { product_id } = ctx.request.body

    product_id = product_id.trim()

    const resp = await deleteProductById(product_id, ctx.user.store_id)

    if (resp.deletedCount) {
        ctx.body = { success: true, msg: "Deleted" }
        return
    }
    ctx.body = { success: false, msg: "Product Id doesnt exist" }
}


const updateProduct = async (ctx) => {
    let { product_id, product_name, product_desc, product_stock, isActive, price, discounted_price, img, category_id } = ctx.request.body

    const storeId = ctx.user.store_id

    product_name = product_name.trim()
    product_desc = product_desc.trim()
    img = img.trim()
    category_id = category_id.trim()

    const resp = await updateProductById(product_id, storeId, { product_name, product_desc, product_stock, isActive, price, discounted_price, img, category_id: new ObjectId(category_id) })

    if (!resp) {
        ctx.body = { success: true, data: resp, msg: "Product ID doesnt exist" }
        return
    }

    ctx.body = { success: true, data: resp, msg: "Updated" }

}

module.exports = { getProducts, getProduct, getCategoryProducts, getProductsByStoreLink, getActiveProducts, addProductController, deleteProduct, updateProduct }