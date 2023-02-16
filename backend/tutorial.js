const { MongoClient } = require('mongodb');
const {client} = require('./connect');

// const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@myatlasclusteredu.nnrvhxq.mongodb.net/?retryWrites=true&w=majority`;
// const uri = `mongodb+srv://myAtlasDBUser:admin123@myatlasclusteredu.nnrvhxq.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri);

const listDB = async (client) => {
    dblist = await client.db().admin().listDatabases();
}

const main = async( )=> {
    try {
        await client.connect();
        await listDB(client);
        await client.close();
    } catch(e) {
        console.error('e: ', e);
    }
}

main();