const { MongoClient } = require('mongodb');
const {client} = require('./connect');

// const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@myatlasclusteredu.nnrvhxq.mongodb.net/?retryWrites=true&w=majority`;
// const uri = `mongodb+srv://myAtlasDBUser:admin123@myatlasclusteredu.nnrvhxq.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri);

const listDB = async (client) => {
    dblist = await client.db().admin().listDatabases();
    console.log('DBs:');
    dblist.databases.forEach(db=> console.log(' - ', db.name));
}

const main = async( )=> {
    try {
        console.log('client: ', client);
        await client.connect();
        await listDB(client);
        await client.close();
    } catch(e) {
        console.log('e: ', e);
    }
}

main();