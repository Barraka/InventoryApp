const async = require("async");
const { body, validationResult } = require("express-validator");
const {client} = require('../connect');
const ObjectId = require('mongodb').ObjectId;

exports.getModels = async (req, res, next) => {
    try {
        await client.connect();
        const cursor = client.db('inventory').collection('shirt_model').find();
        cursor.sort({"model":1});
        const results = await cursor.toArray();
        //Get the brand names for each model
        let brandCursor= client.db('inventory').collection('brands').find();
        brandCursor = await brandCursor.toArray();
        await client.close();
        res.status(200).send({
            message: results,   
            brands:brandCursor,
        });
    } catch(e) { 
        console.log('e: ', e);
    }
    return;
}
