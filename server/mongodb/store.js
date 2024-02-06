import dotenv from 'dotenv'
import { ObjectId } from 'mongodb'
import { getDb } from '../config/db.config'

dotenv.config()

const dbName = process.env.DB_NAME
const collectionName = 'store'

const insertStore = async (storeObject) => {
    return await getDb().db(dbName).collection(collectionName).insertOne(storeObject);
}

const findStoreByMerchantId = async (userId) => {
    return await getDb().db(dbName).collection(collectionName).findOne({ merchant_id: new ObjectId(userId) });
}

const findStoreByLink = async (store_link) => {
    return await getDb().db(dbName).collection(collectionName).findOne({ store_link });
}

const findStoreById = async (storeId, userId) => {
    return await getDb().db(dbName).collection(collectionName).findOne(
        { _id: new ObjectId(storeId), merchant_id: new ObjectId(userId) }
    );
}

const deleteStoreById = async (storeId, userId) => {
    return await getDb().db(dbName).collection(collectionName).deleteOne(
        { _id: new ObjectId(storeId), merchant_id: new ObjectId(userId) }
    )
}

const updateStoreById = async ({ store_id, merchant_id }, storeObject) => {
    return await getDb().db(dbName).collection(collectionName).findOneAndUpdate(
        { _id: new ObjectId(store_id), merchant_id: new ObjectId(merchant_id) },
        { $set: { ...storeObject } },
        { returnDocument: 'after' }
    )
}

export { insertStore, findStoreByMerchantId, findStoreByLink, deleteStoreById, updateStoreById, findStoreById }