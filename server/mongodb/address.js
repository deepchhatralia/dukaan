require('dotenv').config()
const { ObjectId } = require('mongodb');
const client = require('../config/db.config');

const dbName = process.env.DB_NAME
const collectionName = 'address'


const getAddressById = async (addressId) => {
    return await client.getDb().db(dbName).collection(collectionName).findOne({ _id: new ObjectId(addressId) });
}

const getAllCustomerAddress = async (customer_id) => {
    return await client.getDb().db(dbName).collection(collectionName).find({ customer_id: new ObjectId(customer_id) }).toArray();
}

const insertAddress = async (addressObject) => {
    return await client.getDb().db(dbName).collection(collectionName).insertOne({ ...addressObject });
}

const deleteAddressById = async (addressId, customerId) => {
    return await client.getDb().db(dbName).collection(collectionName).deleteOne({ _id: new ObjectId(addressId), customer_id: new ObjectId(customerId) });
}

module.exports = { getAddressById, getAllCustomerAddress, insertAddress, deleteAddressById }