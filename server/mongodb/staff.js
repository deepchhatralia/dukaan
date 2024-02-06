require('dotenv').config()
const { ObjectId } = require('mongodb');
const client = require('../config/db.config');

const dbName = process.env.DB_NAME
const collectionName = 'user'

const findStaffById = async (_id) => {
    return await client.getDb().db(dbName).collection(collectionName).findOne({ _id: new ObjectId(_id) });
};

const findStaffByEmail = async (email) => {
    return await client.getDb().db(dbName).collection(collectionName).findOne({ email });
};

const insertStaff = async (data) => {
    return await client.getDb().db(dbName).collection(collectionName).insertOne(data);
}

const updateStaff = async (filters, update_fields, options = {}) => {
    return await client.getDb().db(dbName).collection(collectionName).updateOne(filters, update_fields, options);
}

module.exports = { findStaffById, findStaffByEmail, insertStaff, updateStaff }