require('dotenv').config()
const { ObjectId } = require('mongodb')
const client = require('../config/db.config')

const dbName = process.env.dbName
const collectionName = 'cart'

const getCartById = async (customer_id) => {
    return await client.getDb().db(dbName).collection(collectionName).findOne({ customer_id: new ObjectId(customer_id) })
}

module.exports = { getCartById }