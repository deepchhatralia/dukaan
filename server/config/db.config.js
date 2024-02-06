
import dotenv from 'dotenv'
dotenv.config()
import { MongoClient } from 'mongodb'


const URI = process.env.MONGODB_URI;

let client = null;

const init = async (cb) => {
    if (client) return client;

    MongoClient.connect(URI).then(db => {
        client = db;

        cb(null, client);
    }).catch(err => {
        cb(err, null);
    })
}

const getDb = () => client;

export { getDb, init }