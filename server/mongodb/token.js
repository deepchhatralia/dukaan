require('dotenv').config()
const client = require('../config/db.config')

const dbName = process.env.DB_NAME
const collectionName = 'invitedStaff'

const findInvitedStaff = async (filter) => {
    return await client.getDb().db(dbName).collection(collectionName).findOne(filter)
}

const updateInvitedStaff = async (filter, update_fields, options = {}) => {
    return await client.getDb().db(dbName).collection(collectionName).updateOne(filter, update_fields, options)
}

const deleteInvitedStaff = async (token) => {
    return await client.getDb().db(dbName).collection(collectionName).deleteOne(token)
}

module.exports = { findInvitedStaff, updateInvitedStaff, deleteInvitedStaff }