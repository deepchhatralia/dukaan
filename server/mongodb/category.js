require('dotenv').config()
const { ObjectId } = require('mongodb');
const client = require('../config/db.config');

const dbName = process.env.DB_NAME
const collectionName = 'category'

const addCategory = async (obj) => {
    return await client.getDb().db(dbName).collection(collectionName).insertOne(obj);
}

const findCategoryByStore = async (storeId) => {
    return await client.getDb().db(dbName).collection(collectionName).find({ store_id: new ObjectId(storeId) }).toArray()
}

const findCategoryByName = async (category_name, storeId) => {
    return await client.getDb().db(dbName).collection(collectionName).findOne({ category_name, store_id: new ObjectId(storeId) });
}

const deleteCategoryById = async (category_id, storeId) => {
    return await client.getDb().db(dbName).collection(collectionName).deleteOne({ _id: new ObjectId(category_id), store_id: new ObjectId(storeId) })
}

const updateCategoryById = async (category_id, categoryObject) => {
    return await client.getDb().db(dbName).collection(collectionName).findOneAndUpdate({ _id: new ObjectId(category_id) }, { $set: { ...categoryObject } }, { returnDocument: 'after' })
}

module.exports = { addCategory, findCategoryByStore, findCategoryByName, deleteCategoryById, updateCategoryById }