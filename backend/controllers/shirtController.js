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
        console.log('results shirts: ', results);
        //Get the brand names for each model
        let brandCursor= client.db('inventory').collection('brands').find();
        brandCursor = await brandCursor.toArray();
        await client.close();
        res.status(200).send({
            message: results,   
            brands:brandCursor,
        });
    } catch(e) { 
        console.error('e: ', e);
    }
    return;
}

exports.updateModels = async (req, res, next) => {
    try {
        console.log('in shirt update');
        const id=req.originalUrl.split('/')[2]
        const tempval={...req.body};
        delete tempval._id;
        console.log('new object: ', tempval);
        await client.connect();
        const result = await client.db('inventory').collection('shirt_model').replaceOne({_id:new ObjectId(id)}, tempval);
        res.status(200).send({
            message: result,   
        });
    } catch(e) { 
        console.error('e: ', e);
    }
    return;
}