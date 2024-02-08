import dotenv from 'dotenv'
import { ObjectId } from 'mongodb'
import { getDb } from '../config/db.config'

dotenv.config()

const dbName = process.env.DB_NAME
const collectionName = 'invitedStaff'

const findInvitedStaff = (filter) => getDb.db(dbName).collection(collectionName).findOne(filter)

const updateInvitedStaff = (filter, update_fields, options = {}) => getDb.db(dbName).collection(collectionName)
    .updateOne(filter, update_fields, options)

const deleteInvitedStaff = (token) => getDb.db(dbName).collection(collectionName).deleteOne(token)

export { findInvitedStaff, updateInvitedStaff, deleteInvitedStaff }