const { ObjectId } = require("mongodb")
const { addCategory, deleteCategoryById, updateCategoryById, findCategoryByStore } = require("../mongodb/category")

const getCategories = async ctx => {
    const storeId = ctx.user.storeId

    const resp = await findCategoryByStore(storeId)

    if (!resp.length) {
        ctx.body = { success: false, msg: "No categories found" }
        return
    }
    ctx.body = { success: true, data: resp, msg: "Found" }
}

const addCategoryController = async ctx => {
    let { category_name } = ctx.request.body

    category_name = category_name.trim()
    store_id = ctx.user.storeId

    const resp = await addCategory({ category_name, store_id: new ObjectId(store_id) })

    ctx.body = { success: true, msg: "Added" }
}

const deleteCategory = async ctx => {
    let { category_id } = ctx.request.body

    category_id = category_id.trim()

    const resp = await deleteCategoryById(category_id, ctx.user.storeId)

    if (resp.deletedCount) {
        ctx.body = { success: true, msg: "Deleted" }
        return
    }
    ctx.body = { success: false, msg: "Category Id doesnt exist" }
}

const updateCategory = async (ctx) => {
    let { old_category_name, category_id, category_name } = ctx.request.body;

    category_id = category_id.trim()
    category_name = category_name.trim()

    const resp = await updateCategoryById(category_id, { category_name })

    if (!resp) {
        ctx.body = { success: true, data: resp, msg: "Category ID doesnt exist" }
        return
    }

    ctx.body = { success: true, data: resp, msg: "Updated" }
}

module.exports = { getCategories, addCategoryController, deleteCategory, updateCategory }