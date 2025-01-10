import dotenv from "dotenv";
dotenv.config();
import { MongoClient } from "mongodb";

const URI = process.env.MONGODB_URI;

const client = new MongoClient(URI, {});

client
  .connect()
  .then((res) => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log("Failed to conect db");
  });

const getDb = client;
export { getDb };
