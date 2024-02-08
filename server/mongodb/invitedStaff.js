import dotenv from 'dotenv'
import { ObjectId } from 'mongodb'
import { getDb } from '../config/db.config'

dotenv.config()

const dbName = process.env.DB_NAME
const collectionName = 'invitedStaff'

const findInvitedStaff = async (filter) => {
    return await getDb.db(dbName).collection(collectionName).findOne(filter)
}

const updateInvitedStaff = async (filter, update_fields, options = {}) => {
    return await getDb.db(dbName).collection(collectionName).updateOne(filter, update_fields, options)
}

const deleteInvitedStaff = async (token) => {
    return await getDb.db(dbName).collection(collectionName).deleteOne(token)
}

export { findInvitedStaff, updateInvitedStaff, deleteInvitedStaff }