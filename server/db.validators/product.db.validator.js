const { findCategoryByName } = require("../mongodb/category")
const { findProductByName, findProductByStore } = require("../mongodb/product")

const categoryAlreadyExist = async (ctx) => {
    let err = null
    let { old_category_name, category_name } = ctx.request.body

    if (old_category_name === category_name) {
        return err
    }

    category_name = category_name.trim()
    const storeId = ctx.user.storeId;

    const resp = await findCategoryByName(category_name, storeId)

    if (resp) {
        err = { success: false, data: resp, msg: "Category name already exist" }
        return err
    }
    return err
}

const productNameAlreadyExist = async (ctx) => {
    let err = null
    let { old_product_name, product_name } = ctx.request.body

    if (old_product_name === product_name) {
        return err
    }

    product_name = product_name.trim()
    const storeId = ctx.user.storeId

    const resp = await findProductByName(product_name, storeId)

    if (resp) {
        err = { success: false, data: resp, msg: "Product name already exist" }
        return err
    }
    return err
}

module.exports = { categoryAlreadyExist, productNameAlreadyExist }