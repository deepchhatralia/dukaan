const ObjectId = require('mongodb').ObjectId

const getObjectId = (id) => {
    return new ObjectId(id);
}

module.exports = getObjectId 