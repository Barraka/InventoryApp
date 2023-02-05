const { MongoClient } = require('mongodb');

// const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@myatlasclusteredu.nnrvhxq.mongodb.net/?retryWrites=true&w=majority`;
const uri = `mongodb+srv://myAtlasDBUser:admin123@myatlasclusteredu.nnrvhxq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
// console.log('connect client: ', client);
module.exports = {client: client};
const connection = async() => {
    try {
        await client.connect();
        return client;
    } catch (e) {
        console.log('e: ', e);
    }
}

const close = async() => {
    try {
        await client.close();
    } catch (e) {
        console.log('e: ', e);
    }
}