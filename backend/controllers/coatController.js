const async = require("async");
const { body, validationResult } = require("express-validator");
const {client} = require('../connect');
const ObjectId = require('mongodb').ObjectId;

exports.getModels = async (req, res, next) => {
    try {
        await client.connect();
        const cursor = client.db('inventory').collection('coat_model').find();
        cursor.sort({"model":1});
        const results = await cursor.toArray();
        console.log('results coats: ', results);
        //Get the brand names for each model
        let brandCursor= client.db('inventory').collection('brands').find();
        brandCursor = await brandCursor.toArray();
        // await client.close();
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
        console.log('in coat update');
        const id=req.originalUrl.split('/')[2]
        const tempval={...req.body};
        delete tempval._id;
        console.log('new object: ', tempval);
        await client.connect();
        const result = await client.db('inventory').collection('coat_model').replaceOne({_id:new ObjectId(id)}, tempval);
        res.status(200).send({
            message: result,   
        });
    } catch(e) { 
        console.error('e: ', e);
    }
    return;
}

exports.addCoatModel = [
    body('brand').exists().trim().escape(),
    body('model', 'Model name must be at least 3 characters').exists().isString().trim().isLength({ min: 3 }).escape(),
    async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            console.error('errors found, ', errors);
            res.status(500).send({
                message: errors,   
            });
            return;
        }
        //No errors, need to validate data structure
        try {
            await client.connect();
            const cursor = await client.db('inventory').collection('brands').findOne({_id: new ObjectId(req.body.brand)}); //req.body.brand
            if(!cursor) {
                res.status(500).send({message:"Brand id not found"});
                return;
            }
            //Brand id has been found, proceed to add
            const cursorAdd = await client.db('inventory').collection('coat_model').insertOne(req.body); //req.body.brand
            const cursorFind = client.db('inventory').collection('coat_model').find();
            cursorFind.sort({"model":1});
            const results = await cursorFind.toArray();
            if(results.length)res.status(200).send({message: results});
        } catch(e) { 
            console.error('error adding coat model: ', e);
        }
        return;
      },
];

exports.deleteModel = async (req, res, next) => {
    try {
        const id=req.originalUrl.split('/')[2]
        const tempval={...req.body};
        await client.connect();
        const result = await client.db('inventory').collection('coat_model').deleteOne({_id:new ObjectId(id)});
        const cursorFind = client.db('inventory').collection('coat_model').find();
        cursorFind.sort({"model":1});
        const results = await cursorFind.toArray();
        if(results.length)res.status(200).send({message: results});
    } catch(e) { 
        console.error('e: ', e);
    }
    return;
}

// exports.cleanData = async (req, res, next) => {
//     try {
//         const tempval=[...req.body];
//         await client.connect();
//         tempval.forEach(async x=> {
//             console.log('x coat: ', x);
//             const id=x._id;
//             delete x._id;
//             delete x.description;
//             x.price=113;
//             x.sizes={'XS':2,'M':3,'L':2};
//             const result = await client.db('inventory').collection('coat_model').replaceOne({_id:new ObjectId(id)}, x);
//         });
//         // const result = await client.db('inventory').collection('coat_model').replaceOne({_id:new ObjectId(id)}, tempval);
//         res.status(200).send({
//             message: result,   
//         });
//     } catch(e) { 
//         console.error('e: ', e);
//     }
//     return;
// }