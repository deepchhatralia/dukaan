import dotenv from 'dotenv'
import { ObjectId } from 'mongodb'
import { getDb } from '../config/db.config'

dotenv.config()

const dbName = process.env.DB_NAME
const collectionName = 'product'

const findProductByStore = async (storeId) => {
    return await getDb().db(dbName).collection(collectionName).find({ store_id: new ObjectId(storeId) }).toArray();
}

const findProductByStoreLink = async (store_link) => {
    return await getDb().db(dbName).collection(collectionName).find({ store_link }).toArray();
}

const findProductByCategoryId = async (categoryId) => {
    return await getDb().db(dbName).collection(collectionName).find({ category_id: new ObjectId(categoryId) }).toArray();
}

const findProductById = async (product_id, storeId) => {
    return await getDb().db(dbName).collection(collectionName).findOne({ _id: new ObjectId(product_id), store_id: new ObjectId(storeId) });
}

const findProduct = async (filter) => {
    return await getDb().db(dbName).collection(collectionName).findOne(filter);
}

const findActiveProducts = async (storeId) => {
    return await getDb().db(dbName).collection(collectionName).find({ store_id: new ObjectId(storeId), isActive: true }).toArray();
}

const addProduct = async (productObject) => {
    return await getDb().db(dbName).collection(collectionName).insertOne(productObject);
}

const deleteProductById = async (productId, storeId) => {
    return await getDb().db(dbName).collection(collectionName).deleteOne({ _id: new ObjectId(productId), store_id: new ObjectId(storeId) });
}

const updateProductById = async (product_id, storeId, productObject) => {
    return await getDb().db(dbName).collection(collectionName).findOneAndUpdate({ _id: new ObjectId(product_id), store_id: new ObjectId(storeId) }, { $set: { ...productObject } }, { returnDocument: 'after' })
}

export { findActiveProducts, findProductById, findProductByStoreLink, findProductByCategoryId, findProductByStore, findProduct, addProduct, deleteProductById, updateProductById }