import dotenv from "dotenv";
import { ObjectId } from "mongodb";
import { getDb } from "../config/db.config";

dotenv.config();

const dbName = process.env.DB_NAME;
const collectionName = "user";

const findUserByEmail = (email) =>
  getDb.db(dbName).collection(collectionName).findOne({ email });

const insertUser = (document, options = {}) =>
  getDb.db(dbName).collection(collectionName).insertOne(document, options);

const updateUser = (filter, document, options = {}) =>
  getDb
    .db(dbName)
    .collection(collectionName)
    .updateOne(filter, document, options);

export { findUserByEmail, insertUser, updateUser };
