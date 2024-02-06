import dotenv from 'dotenv'
import { ObjectId } from 'mongodb'
import { getDb } from '../config/db.config'

dotenv.config()
const dbName = process.env.DB_NAME
const collectionName = 'cart'

const getCustomerCartById = async (customerId, storeId) => {
    return await getDb().db(dbName).collection(collectionName).aggregate([
        {
            $match: { customer_id: new ObjectId(customerId), store_id: new ObjectId(storeId) }
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
}

const addToCart = async (customer_id, product_id, qty, store_id) => {
    // if customer_id, store_id and product_id exist - increment qty
    // if customer_id, store_id but produuct_id doesnt exist - push
    // if customer_id or store_id doesnt exist - insert

    const resp = await getDb().db(dbName).collection(collectionName).findOne({ customer_id: new ObjectId(customer_id), store_id: new ObjectId(store_id), 'cartInfo.product_id': new ObjectId(product_id) })

    if (resp) {
        const res = await getDb().db(dbName).collection(collectionName).updateOne(
            { customer_id: new ObjectId(customer_id), 'cartInfo.product_id': new ObjectId(product_id), store_id: new ObjectId(store_id) },
            {
                $inc: { 'cartInfo.$.qty': 1 }
            }
        )
        return { success: true, msg: "Incremented" }
    } else {

        const res = await getDb().db(dbName).collection(collectionName).updateOne(
            { customer_id: new ObjectId(customer_id), store_id: new ObjectId(store_id) },
            {
                $push: { 'cartInfo': { product_id: new ObjectId(product_id), qty: 1 } }
            },
            { upsert: true }
        );

        return { success: true, msg: "Added" }
    }
}

const incrementCartQuantity = async (customer_id, product_id, store_id) => {
    return await getDb().db(dbName).collection(collectionName).updateOne(
        { customer_id: new ObjectId(customer_id), 'cartInfo.product_id': new ObjectId(product_id), store_id: new ObjectId(store_id) },
        { $inc: { 'cartInfo.$.qty': 1 } }
    )
}

const decrementCartQuantity = async (customer_id, product_id, store_id) => {
    return await getDb().db(dbName).collection(collectionName).updateOne(
        { customer_id: new ObjectId(customer_id), 'cartInfo.product_id': new ObjectId(product_id), store_id: new ObjectId(store_id) },
        { $inc: { 'cartInfo.$.qty': -1 } }
    )
}

const removeItem = async (customer_id, product_id, store_id) => {
    return await getDb().db(dbName).collection(collectionName).updateMany({ customer_id: new ObjectId(customer_id), store_id: new ObjectId(store_id) }, {
        $pull: { cartInfo: { product_id: new ObjectId(product_id) } }
    })
}

const clearCart = async (customer_id, store_id) => {
    return await getDb().db(dbName).collection(collectionName).deleteOne(
        { customer_id: new ObjectId(customer_id), store_id: new ObjectId(store_id) }
    )
}


export { getCustomerCartById, addToCart, incrementCartQuantity, decrementCartQuantity, removeItem, clearCart }