import dotenv from 'dotenv'
import { ObjectId } from 'mongodb'
import { getDb } from '../config/db.config'
import { findProductById } from './product'

dotenv.config()
const dbName = process.env.DB_NAME
const collectionName = 'cart'

const getCartInfo = (customerId, storeId) =>
    getDb.db(dbName).collection(collectionName).findOne(
        {
            customer_id: new ObjectId(customerId),
            store_id: new ObjectId(storeId)
        }
    )

const getCustomerCartById = (customerId, storeId) =>
    getDb.db(dbName).collection(collectionName).aggregate([
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

const addToCart = (customer_id, product_id, qty, store_id) => {

    const resp = getDb.db(dbName).collection(collectionName).findOne({ customer_id: new ObjectId(customer_id), store_id: new ObjectId(store_id), 'cartInfo.product_id': new ObjectId(product_id) })

    if (resp) {
        const res = getDb.db(dbName).collection(collectionName).updateOne(
            { customer_id: new ObjectId(customer_id), 'cartInfo.product_id': new ObjectId(product_id), store_id: new ObjectId(store_id) },
            {
                $inc: { 'cartInfo.$.qty': 1 }
            }
        )
        return { success: true, msg: "Incremented" }
    } else {
        const product = findProductById(product_id, store_id);

        const res = getDb.db(dbName).collection(collectionName).updateOne(
            { customer_id: new ObjectId(customer_id), store_id: new ObjectId(store_id) },
            {
                $push: { 'cartInfo': { product_id: new ObjectId(product_id), qty: 1, price: product.price } }
            },
            { upsert: true }
        );

        return { success: true, msg: "Added" }
    }
}

const incrementCartQuantity = (customer_id, product_id, store_id) =>
    getDb.db(dbName).collection(collectionName).updateOne(
        {
            customer_id: new ObjectId(customer_id),
            'cartInfo.product_id': new ObjectId(product_id),
            store_id: new ObjectId(store_id)
        },
        { $inc: { 'cartInfo.$.qty': 1 } }
    )

const decrementCartQuantity = (customer_id, product_id, store_id) =>
    getDb.db(dbName).collection(collectionName).updateOne(
        {
            customer_id: new ObjectId(customer_id),
            'cartInfo.product_id': new ObjectId(product_id),
            store_id: new ObjectId(store_id)
        },
        { $inc: { 'cartInfo.$.qty': -1 } }
    )

const removeItem = (customer_id, product_id, store_id) =>
    getDb.db(dbName).collection(collectionName).updateMany(
        {
            customer_id: new ObjectId(customer_id),
            store_id: new ObjectId(store_id)
        },
        {
            $pull: { cartInfo: { product_id: new ObjectId(product_id) } }
        }
    )

const clearCart = (customer_id, store_id) =>
    getDb.db(dbName).collection(collectionName).deleteOne(
        {
            customer_id: new ObjectId(customer_id),
            store_id: new ObjectId(store_id)
        }
    )

export { getCartInfo, getCustomerCartById, addToCart, incrementCartQuantity, decrementCartQuantity, removeItem, clearCart }