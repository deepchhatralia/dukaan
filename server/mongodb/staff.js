import dotenv from 'dotenv'
import { ObjectId } from 'mongodb'
import { getDb } from '../config/db.config'

dotenv.config()

const dbName = process.env.DB_NAME
const collectionName = 'user'

const findStaffById = async (_id) => {
    return await getDb.db(dbName).collection(collectionName).findOne({ _id: new ObjectId(_id) });
};

const findStaffByEmail = async (email) => {
    return await getDb.db(dbName).collection(collectionName).findOne({ email });
};

const insertStaff = async (data) => {
    return await getDb.db(dbName).collection(collectionName).insertOne(data);
}

const updateStaff = async (filters, update_fields, options = {}) => {
    return await getDb.db(dbName).collection(collectionName).updateOne(filters, update_fields, options);
}

export { findStaffById, findStaffByEmail, insertStaff, updateStaff }