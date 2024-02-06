import client from '../config/db.config';
import { ObjectId } from "mongodb";

import { getCustomerCartById, addToCart, clearCart, removeItem } from "../mongodb/cart"

const getCustomerCart = async ctx => {
    const customer_id = ctx.user._id
    const store_id = ctx.user.store_id

    const resp = await getCustomerCartById(customer_id)

    ctx.body = { success: true, data: resp }

}

const addToCartController = async ctx => {
    const customer_id = ctx.user._id
    const product_id = ctx.request.body.product_id.trim()
    const qty = ctx.request.body.qty

    const resp = await addToCart(customer_id, product_id, qty);

    ctx.body = { success: true, data: resp }
}

const removeCartItem = async ctx => {
    const customer_id = ctx.user._id
    const product_id = ctx.request.body.product_id.trim()

    const resp = await removeItem(customer_id, product_id);

    if (!resp.modifiedCount) {
        ctx.body = { success: true, msg: "Product doesnt exist in cart" }
        return
    }
    ctx.body = { success: true, data: resp }
}

const clearCartController = async ctx => {
    const customer_id = ctx.user._id

    const resp = await clearCart(customer_id)

    if (!resp.deletedCount) {
        ctx.body = { success: false, msg: "Customer ID doesnt exist" }
        return
    }
    ctx.body = { success: true, data: resp }
}

export { getCustomerCart, addToCartController, removeCartItem, clearCartController }