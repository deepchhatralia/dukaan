import dotenv from 'dotenv'
import { ObjectId } from 'mongodb'
import { getDb } from '../config/db.config'

dotenv.config()

const dbName = process.env.DB_NAME
const collectionName = 'address'


const getAddressById = async (addressId) => {
    return await getDb().db(dbName).collection(collectionName).findOne({ _id: new ObjectId(addressId) });
}

const getAllCustomerAddress = async (customer_id) => {
    return await getDb().db(dbName).collection(collectionName).find({ customer_id: new ObjectId(customer_id) }).toArray();
}

const insertAddress = async (addressObject) => {
    return await getDb().db(dbName).collection(collectionName).insertOne({ ...addressObject });
}

const updateAddress = async (filter, addressObject) => {
    return await getDb().db(dbName).collection(collectionName).findOneAndUpdate(filter, { $set: { ...addressObject } }, { returnDocument: 'after' });
}

const deleteAddressById = async (addressId, customerId) => {
    return await getDb().db(dbName).collection(collectionName).deleteOne(
        { _id: new ObjectId(addressId), customer_id: new ObjectId(customerId) });
}

export { getAddressById, getAllCustomerAddress, insertAddress, updateAddress, deleteAddressById }