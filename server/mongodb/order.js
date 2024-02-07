import dotenv from 'dotenv'
dotenv.config()
import { getDb } from "../config/db.config"

const dbName = process.env.DB_NAME
const collectionName = 'order'

const findOrders = async (filter, options = {}) => {
    return await getDb().db(dbName).collection(collectionName).find(filter).toArray();
}

const updateOrder = async (filter, update, options = {}) => {
    return await getDb().db(dbName).collection(collectionName).updateOne(filter, update, options);
}

const insertOrder = async (data) => {
    return await getDb().db(dbName).collection(collectionName).insertOne(data);
}

const changeProductQuantity = async (cartInfo) => {
    const productId = []

    cartInfo.forEach(element => {
        productId.push(element.product_id)
    });

    return await getDb().db(dbName).collection('product').updateMany(
        { _id: { $in: productId } },
        { $inc: { product_stock: -1 } }
    )
}

export { findOrders, updateOrder, insertOrder, changeProductQuantity }