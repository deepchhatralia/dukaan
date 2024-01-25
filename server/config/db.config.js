require('dotenv').config()
const MongoClient = require('mongodb').MongoClient

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

module.exports = { init, getDb }