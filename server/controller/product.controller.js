import { ObjectId } from 'mongodb'
import { addProduct, deleteProductById, findProductByStore, updateProductById, findProductById, findActiveProducts, findProductByStoreLink, findProductByCategoryId } from '../mongodb/product'

const lowStockThreshold = process.env.LOW_STOCK_THRESHOLD

const getProducts = async (ctx) => {
    const storeId = ctx.user.store_id
    let filter = { store_id: new ObjectId(storeId) }

    const { page = 1, sortBy = 'product_name', productFilter, category } = ctx.query

    if (productFilter && productFilter.trim()) {
        // const y = productFilter.split(',').reduce((acc, curr) => {
        //     if (curr === 'out_of_stock') {
        //         acc['product_stock'] = 0;
        //     }
        //     if (curr === 'in_stock') {
        //         acc['product_stock'] = { $gt: 0 };
        //     }
        //     if (curr === 'low_stock') {
        //         acc['product_stock'] = { $lt: lowStockThreshold };
        //     }
        //     return acc;
        // }, filter);
        // console.log(y)

        productFilter.split(',').forEach(val => {
            val = val.trim()
            if (val === 'out_of_stock') {
                filter['product_stock'] = 0
            }
            if (val === 'in_stock') {
                filter['product_stock'] = { $gt: 0 }
            }
            if (val === 'low_stock') {
                filter['product_stock'] = { $lt: lowStockThreshold }
            }
        });
    }

    const pipeline = [
        {
            $match: filter
        }
    ]

    if (category) {
        pipeline.push(
            {
                $lookup: {
                    from: 'category',
                    foreignField: '_id',
                    localField: 'category_id',
                    as: 'category_detail'
                }
            },
            {
                $match: { 'category_detail.category_name': { $in: category.split(',') } }
            }
        )
    }

    // const resp = await findProductByStore(filter, page, sortBy.trim())
    const resp = await findProductByStore(pipeline, page, sortBy.trim())

    if (!resp.length) {
        ctx.body = { success: false, msg: "No products found" }
        return
    }
    ctx.body = { success: true, data: resp, msg: "Found" }
}

const getCategoryProducts = async (ctx) => {
    const category_id = ctx.params.categoryId
    const store_id = ctx.user.store_id

    const resp = await findProductByCategoryId(category_id, store_id)

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

    let filter = { store_id: new ObjectId(storeId), isActive: true }

    let { page = 1, sortBy = 'product_name', productFilter, category } = ctx.query

    if (productFilter) {
        productFilter.split(',').forEach(val => {
            val = val.trim()
            if (val === 'out_of_stock') {
                filter['product_stock'] = 0
            }
            if (val === 'in_stock') {
                filter['product_stock'] = { $gt: 0 }
            }
            if (val === 'low_stock') {
                filter['product_stock'] = { $lt: lowStockThreshold }
            }
        });
    }

    const pipeline = [
        {
            $match: filter
        }
    ]

    if (category) {
        pipeline.push(
            {
                $lookup: {
                    from: 'category',
                    foreignField: '_id',
                    localField: 'category_id',
                    as: 'category_detail'
                }
            },
            {
                $match: { 'category_detail.category_name': { $in: category.split(',') } }
            }
        )
    }

    const resp = await findActiveProducts(pipeline, page, sortBy)

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

export { getProducts, getProduct, getCategoryProducts, getProductsByStoreLink, getActiveProducts, addProductController, deleteProduct, updateProduct }