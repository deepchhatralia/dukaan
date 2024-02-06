require('dotenv').config()
const { ObjectId } = require('mongodb')
const client = require('../config/db.config')

const dbName = process.env.DB_NAME
const collectionName = 'cart'

const getCustomerCartById = async customerId => {
    return await client.getDb().db(dbName).collection(collectionName).aggregate([
        {
            $match: { customer_id: new ObjectId(customerId) }
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

const addToCart = async (customer_id, product_id, qty) => {
    const resp = await client.getDb().db(dbName).collection(collectionName).findOne({ 'cartInfo.product_id': new ObjectId(product_id) })

    // product exists in user's cart
    if (resp) {
        const res = await client.getDb().db(dbName).collection(collectionName).updateOne({ customer_id: new ObjectId(customer_id), 'cartInfo.product_id': new ObjectId(product_id) }, { $inc: { 'cartInfo.$.qty': 1 } })

        return { success: true, msg: "Incremented" }
    } else {
        const res = await client.getDb().db(dbName).collection(collectionName).updateOne({ 'customer_id': new ObjectId(customer_id) }, { $push: { cartInfo: { product_id: new ObjectId(product_id), qty: 1 } } }, { upsert: true })

        return { success: true, msg: "Added" }
    }
}

const incrementCartQuantity = async (customer_id, product_id) => {
    return await client.getDb().db(dbName).collection(collectionName).updateOne({ customer_id: new ObjectId(customer_id), 'cartInfo.product_id': new ObjectId(product_id) }, { $inc: { 'cartInfo.$.qty': 1 } })
}

const decrementCartQuantity = async (customer_id, product_id) => {
    return await client.getDb().db(dbName).collection(collectionName).updateOne({ customer_id: new ObjectId(customer_id), 'cartInfo.product_id': new ObjectId(product_id) }, { $inc: { 'cartInfo.$.qty': -1 } })
}

const removeItem = async (customer_id, product_id) => {
    return await client.getDb().db(dbName).collection(collectionName).updateMany({ customer_id: new ObjectId(customer_id) }, {
        $pull: { cartInfo: { product_id: new ObjectId(product_id) } }
    })
}

const clearCart = async (customer_id) => {
    return await client.getDb().db(dbName).collection(collectionName).deleteOne({ customer_id: new ObjectId(customer_id) })
}


module.exports = { getCustomerCartById, addToCart, incrementCartQuantity, decrementCartQuantity, removeItem, clearCart }