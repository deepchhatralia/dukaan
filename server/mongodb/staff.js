import dotenv from "dotenv";
import { ObjectId } from "mongodb";
import { getDb } from "../config/db.config";

dotenv.config();

const dbName = process.env.DB_NAME;
const collectionName = "user";

const findStaffById = (_id) =>
  getDb
    .db(dbName)
    .collection(collectionName)
    .findOne({ _id: new ObjectId(_id) });

const findStaffByEmail = (email) =>
  getDb.db(dbName).collection(collectionName).findOne({ email });

const insertStaff = (data) =>
  getDb.db(dbName).collection(collectionName).insertOne(data);

const updateStaff = (filters, update_fields, options = {}) =>
  getDb
    .db(dbName)
    .collection(collectionName)
    .updateOne(filters, update_fields, options);

export { findStaffById, findStaffByEmail, insertStaff, updateStaff };
