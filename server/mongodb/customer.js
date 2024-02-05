require('dotenv').config()
const { ObjectId } = require('mongodb');
const client = require('../config/db.config');

const dbName = process.env.DB_NAME
const collectionName = 'customer'

const findCustomerByEmail = async (email) => {
    return await client.getDb().db(dbName).collection(collectionName).findOne({ email });
};

const findCustomerById = async (customer_id) => {
    return await client.getDb().db(dbName).collection(collectionName).findOne({ _id: new ObjectId(customer_id) });
};

const insertCustomer = async (data) => {
    return await client.getDb().db(dbName).collection(collectionName).insertOne(data);
}

module.exports = { findCustomerById, findCustomerByEmail, insertCustomer }