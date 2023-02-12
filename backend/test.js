const async = require("async");
const { body, validationResult } = require("express-validator");
const {client} = require('./connect');
const ObjectId = require('mongodb').ObjectId;


patchModels = async (req, res, next) => {
    await client.connect();
    // const result = client.db('inventory').collection('shoe_model').find({sizes:{}});
    const result = await client.db('inventory').collection('coat_model').updateMany({sizes:{}}, {"$set": {"sizes": {"S":3, "M":2, "L":4, "XL":1}}});
    return result;
    
}

async function run() {
    const result = await patchModels()
    .then(res => {
        console.log('res: ', res);   
        client.close();
    });
    // console.log('result: ', result);
}

run();