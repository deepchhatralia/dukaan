import dotenv from 'dotenv'
import { ObjectId } from 'mongodb'
import { getDb } from '../config/db.config'

dotenv.config()

const dbName = process.env.DB_NAME
const collectionName = 'customer'

const findCustomerByEmail = (email) => getDb.db(dbName).collection(collectionName)
    .findOne({ email });

const findCustomerById = (customer_id) => getDb.db(dbName).collection(collectionName)
    .findOne({ _id: new ObjectId(customer_id) });

const insertCustomer = (data) => getDb.db(dbName).collection(collectionName)
    .insertOne(data)

export { findCustomerById, findCustomerByEmail, insertCustomer }