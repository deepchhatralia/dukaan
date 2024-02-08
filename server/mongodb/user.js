import dotenv from 'dotenv'
import { ObjectId } from 'mongodb'
import { getDb } from '../config/db.config'

dotenv.config()

const dbName = process.env.DB_NAME
const collectionName = 'user'

const findUserByEmail = async email => {
    return await getDb.db(dbName).collection(collectionName).findOne({ email });
}

const insertUser = async (document, options = {}) => {
    return await getDb.db(dbName).collection(collectionName).insertOne(document, options);
}

const updateUser = async (filter, document, options = {}) => {
    return await getDb.db(dbName).collection(collectionName).updateOne(filter, document, options);
}

export { findUserByEmail, insertUser, updateUser }