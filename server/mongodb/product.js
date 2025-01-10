import dotenv from "dotenv";
import { ObjectId } from "mongodb";
import { getDb } from "../config/db.config";

dotenv.config();

const dbName = process.env.DB_NAME;
const collectionName = "product";

const findProductByStore = (filter, page, pageLimit, sortBy) => {
  const skipLimit = page * pageLimit - pageLimit;
  const sorting = {};

  if (sortBy) {
    const sortOrder = sortBy[0] === "-" ? -1 : 1;
    const sortKey =
      sortBy[0] === "-" ? sortBy.slice(sortBy.lastIndexOf("-") + 1) : sortBy;
    sorting[sortKey] = sortOrder;
  }

  return getDb
    .db(dbName)
    .collection(collectionName)
    .aggregate(filter)
    .skip(Number(skipLimit))
    .limit(Number(pageLimit))
    .sort(sorting)
    .toArray();
};

const findProductByStoreLink = (store_link) =>
  getDb.db(dbName).collection(collectionName).find({ store_link }).toArray();

const findProductByCategoryId = (categoryId, store_id) =>
  getDb
    .db(dbName)
    .collection(collectionName)
    .find({
      category_id: new ObjectId(categoryId),
      store_id: new ObjectId(store_id),
    })
    .toArray();

const findProductById = (product_id, storeId) =>
  getDb
    .db(dbName)
    .collection(collectionName)
    .findOne({
      _id: new ObjectId(product_id),
      store_id: new ObjectId(storeId),
    });

const findProduct = (filter) =>
  getDb.db(dbName).collection(collectionName).findOne(filter);

const findActiveProducts = (pipeline, page, pageLimit, sortBy) => {
  const skipLimit = page * pageLimit - pageLimit;
  const sorting = {};

  if (sortBy) {
    const sortOrder = sortBy[0] === "-" ? -1 : 1;
    const sortKey = sortBy[0] === "-" ? sortBy.slice(1) : sortBy;
    sorting[sortKey] = sortOrder;
  }

  return getDb
    .db(dbName)
    .collection(collectionName)
    .aggregate(pipeline)
    .skip(Number(skipLimit))
    .limit(Number(pageLimit))
    .sort(sorting)
    .toArray();
};

const addProduct = (productObject) =>
  getDb.db(dbName).collection(collectionName).insertOne(productObject);

const deleteProductById = (productId, storeId) =>
  getDb
    .db(dbName)
    .collection(collectionName)
    .deleteOne({
      _id: new ObjectId(productId),
      store_id: new ObjectId(storeId),
    });

const updateProductById = (product_id, storeId, productObject) =>
  getDb
    .db(dbName)
    .collection(collectionName)
    .findOneAndUpdate(
      {
        _id: new ObjectId(product_id),
        store_id: new ObjectId(storeId),
      },
      { $set: { ...productObject } },
      { returnDocument: "after" }
    );

export {
  findActiveProducts,
  findProductById,
  findProductByStoreLink,
  findProductByCategoryId,
  findProductByStore,
  findProduct,
  addProduct,
  deleteProductById,
  updateProductById,
};
