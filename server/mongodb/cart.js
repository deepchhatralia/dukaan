import dotenv from 'dotenv'
import { ObjectId } from 'mongodb'
import { getDb } from '../config/db.config'
import { findProductById } from './product'

dotenv.config()
const dbName = process.env.DB_NAME
const collectionName = 'cart'

const getCartInfo = async (customerId, storeId) => {
    return await getDb.db(dbName).collection(collectionName).findOne(
        { customer_id: new ObjectId(customerId), store_id: new ObjectId(storeId) })
}

const getCustomerCartById = async (customerId, storeId) => getDb.db(dbName).collection(collectionName).aggregate([
    {
        $match: { customer_id: new ObjectId(customerId), store_id: new ObjectId(storeId) }
    },
    {
        $unwind: "$cartInfo"
    },
    {
        $lookup: {
            from: 'product',
            foreignField: '_id',
            localField: 'cartInfo.product_id',
            as: 'product_detail'
        }
    }
]).toArray()

const addToCart = async (customer_id, product_id, qty, store_id) => {

    const resp = await getDb.db(dbName).collection(collectionName).findOne({ customer_id: new ObjectId(customer_id), store_id: new ObjectId(store_id), 'cartInfo.product_id': new ObjectId(product_id) })

    if (resp) {
        const res = await getDb.db(dbName).collection(collectionName).updateOne(
            { customer_id: new ObjectId(customer_id), 'cartInfo.product_id': new ObjectId(product_id), store_id: new ObjectId(store_id) },
            {
                $inc: { 'cartInfo.$.qty': 1 }
            }
        )
        return { success: true, msg: "Incremented" }
    } else {
        const product = await findProductById(product_id, store_id);

        const res = await getDb.db(dbName).collection(collectionName).updateOne(
            { customer_id: new ObjectId(customer_id), store_id: new ObjectId(store_id) },
            {
                $push: { 'cartInfo': { product_id: new ObjectId(product_id), qty: 1, price: product.price } }
            },
            { upsert: true }
        );

        return { success: true, msg: "Added" }
    }
}

const incrementCartQuantity = async (customer_id, product_id, store_id) => {
    return await getDb.db(dbName).collection(collectionName).updateOne(
        { customer_id: new ObjectId(customer_id), 'cartInfo.product_id': new ObjectId(product_id), store_id: new ObjectId(store_id) },
        { $inc: { 'cartInfo.$.qty': 1 } }
    )
}

const decrementCartQuantity = async (customer_id, product_id, store_id) => {
    return await getDb.db(dbName).collection(collectionName).updateOne(
        { customer_id: new ObjectId(customer_id), 'cartInfo.product_id': new ObjectId(product_id), store_id: new ObjectId(store_id) },
        { $inc: { 'cartInfo.$.qty': -1 } }
    )
}

const removeItem = async (customer_id, product_id, store_id) => {
    return await getDb.db(dbName).collection(collectionName).updateMany(
        { customer_id: new ObjectId(customer_id), store_id: new ObjectId(store_id) },
        {
            $pull: { cartInfo: { product_id: new ObjectId(product_id) } }
        })
}

const clearCart = async (customer_id, store_id) => {
    return await getDb.db(dbName).collection(collectionName).deleteOne(
        { customer_id: new ObjectId(customer_id), store_id: new ObjectId(store_id) }
    )
}


export { getCartInfo, getCustomerCartById, addToCart, incrementCartQuantity, decrementCartQuantity, removeItem, clearCart }