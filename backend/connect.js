const { MongoClient } = require('mongodb');

// const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@myatlasclusteredu.nnrvhxq.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb+srv://myAtlasDBUser:admin123@myatlasclusteredu.nnrvhxq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
module.exports = {client: client};
