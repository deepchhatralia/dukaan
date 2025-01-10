import dotenv from "dotenv";
import { ObjectId } from "mongodb";
import { getDb } from "../config/db.config";

dotenv.config();

const dbName = process.env.DB_NAME;
const collectionName = "address";

const getAddressById = (addressId) =>
  getDb
    .db(dbName)
    .collection(collectionName)
    .findOne({ _id: new ObjectId(addressId) });

const getAllCustomerAddress = (customer_id) =>
  getDb
    .db(dbName)
    .collection(collectionName)
    .find({ customer_id: new ObjectId(customer_id) })
    .toArray();

const insertAddress = (addressObject) =>
  getDb
    .db(dbName)
    .collection(collectionName)
    .insertOne({ ...addressObject });

const updateAddress = (filter, addressObject) =>
  getDb
    .db(dbName)
    .collection(collectionName)
    .findOneAndUpdate(
      filter,
      { $set: { ...addressObject } },
      { returnDocument: "after" }
    );

const deleteAddressById = (addressId, customerId) =>
  getDb
    .db(dbName)
    .collection(collectionName)
    .deleteOne({
      _id: new ObjectId(addressId),
      customer_id: new ObjectId(customerId),
    });

export {
  getAddressById,
  getAllCustomerAddress,
  insertAddress,
  updateAddress,
  deleteAddressById,
};
