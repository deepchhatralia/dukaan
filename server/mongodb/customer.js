import dotenv from 'dotenv'
import { ObjectId } from 'mongodb'
import { getDb } from '../config/db.config'

dotenv.config()

const dbName = process.env.DB_NAME
const collectionName = 'customer'

const findCustomerByEmail = async (email) => {
    return await getDb().db(dbName).collection(collectionName).findOne({ email });
};

const findCustomerById = async (customer_id) => {
    return await getDb().db(dbName).collection(collectionName).findOne({ _id: new ObjectId(customer_id) });
};

const insertCustomer = async (data) => {
    return await getDb().db(dbName).collection(collectionName).insertOne(data);
}

export { findCustomerById, findCustomerByEmail, insertCustomer }