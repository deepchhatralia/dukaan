import dotenv from 'dotenv'
import { ObjectId } from 'mongodb'
import { getDb } from '../config/db.config'

dotenv.config()
const dbName = process.env.DB_NAME
const collectionName = 'category'

const addCategory = async (obj) => {
    return await getDb().db(dbName).collection(collectionName).insertOne(obj);
}

const findCategoryByStore = async (storeId) => {
    return await getDb().db(dbName).collection(collectionName).find({ store_id: new ObjectId(storeId) }).toArray()
}

const findCategory = async (filter) => {
    return await getDb().db(dbName).collection(collectionName).findOne(filter);
}

const deleteCategoryById = async (category_id, storeId) => {
    return await getDb().db(dbName).collection(collectionName).deleteOne(
        { _id: new ObjectId(category_id), store_id: new ObjectId(storeId) }
    )
}

const updateCategoryById = async (category_id, categoryObject) => {
    return await getDb().db(dbName).collection(collectionName).findOneAndUpdate(
        { _id: new ObjectId(category_id) },
        { $set: { ...categoryObject } },
        { returnDocument: 'after' }
    )
}

export { addCategory, findCategoryByStore, findCategory, deleteCategoryById, updateCategoryById }