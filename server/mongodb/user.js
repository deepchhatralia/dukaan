require('dotenv').config()
const { ObjectId } = require('mongodb')
const client = require('../config/db.config')

const dbName = process.env.DB_NAME
const collectionName = 'user'

const findUserByEmail = async email => {
    return await client.getDb().db(dbName).collection(collectionName).findOne({ email });
}

const insertUser = async (document, options = {}) => {
    return await client.getDb().db(dbName).collection(collectionName).insertOne(document, options);
}

const updateUser = async (filter, document, options = {}) => {
    return await client.getDb().db(dbName).collection(collectionName).updateOne(filter, document, options);
}

module.exports = { findUserByEmail, insertUser, updateUser }