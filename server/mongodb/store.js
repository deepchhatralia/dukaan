require('dotenv').config()
const { ObjectId } = require('mongodb')
const client = require('../config/db.config')
const { getObjectId } = require('../service')

const dbName = process.env.DB_NAME
const collectionName = 'store'

const insertStore = async (storeObject) => {
    return await client.getDb().db(dbName).collection(collectionName).insertOne(storeObject);
}

const findStoreByMerchantId = async (userId) => {
    return await client.getDb().db(dbName).collection(collectionName).findOne({ merchant_id: new ObjectId(userId) });
}

const findStoreByLink = async (store_link) => {
    return await client.getDb().db(dbName).collection(collectionName).findOne({ store_link });
}

const findStoreById = async (storeId, userId) => {
    return await client.getDb().db(dbName).collection(collectionName).findOne({ _id: new ObjectId(storeId), merchant_id: new ObjectId(userId) });
}

const deleteStoreById = async (storeId, userId) => {
    return await client.getDb().db(dbName).collection(collectionName).deleteOne({ _id: new ObjectId(storeId), merchant_id: new ObjectId(userId) })
}

const updateStoreById = async ({ store_id, merchant_id }, storeObject) => {
    return await client.getDb().db(dbName).collection(collectionName).findOneAndUpdate({ _id: new ObjectId(store_id), merchant_id: new ObjectId(merchant_id) }, { $set: { ...storeObject } }, { returnDocument: 'after' })
}

module.exports = { insertStore, findStoreByMerchantId, findStoreByLink, deleteStoreById, updateStoreById, findStoreById }