const async = require("async");
const { body, validationResult } = require("express-validator");
const {client} = require('../connect');
const Shoe_model = require('../models/shoe_model');
const Shoe_intance = require('../models/shoe_instance');
const ObjectId = require('mongodb').ObjectId;

exports.getModels = async (req, res, next) => {
    try {
        await client.connect();
        const cursor = await client.db('inventory').collection('shoe_model').find();
        cursor.sort({"model":1});
        const results = await cursor.toArray();
        //Get the brand names for each model
        let idList=[];
        results.forEach(x=>idList.push(new ObjectId(x._id)));
        let brandCursor= await client.db('inventory').collection('brands').find();
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
        const id=req.originalUrl.split('/')[2]
        const tempval={...req.body};
        delete tempval._id;
        await client.connect();
        const result = await client.db('inventory').collection('shoe_model').replaceOne({_id:new ObjectId(id)}, tempval);
        res.status(200).send({
            message: result,   
        });
    } catch(e) { 
        console.error('e: ', e);
    }
    return;
}

exports.deleteModel = async (req, res, next) => {
    try {
        const id=req.originalUrl.split('/')[2]
        const tempval={...req.body};
        await client.connect();
        const result = await client.db('inventory').collection('shoe_model').deleteOne({_id:new ObjectId(id)});
        const cursorFind = client.db('inventory').collection('shoe_model').find();
        cursorFind.sort({"model":1});
        const results = await cursorFind.toArray();
        if(results.length)res.status(200).send({message: results});
    } catch(e) { 
        console.error('e: ', e);
    }
    return;
}

exports.cleanData = async (req, res, next) => {
    try {
        const transfer = req.body;
        await client.connect();
        const result = transfer.forEach(async x => {
            const tempval = {};
            tempval.model=x.model;
            tempval.brand=x.brand;
            tempval.sizes=x.sizes;
            const result2 = await client.db('inventory').collection('shoe_model').replaceOne({_id:new ObjectId(x._id)}, tempval);
        });

        res.status(200).send({
            message: result,   
        });
    } catch(e) { 
        console.error('e: ', e);
    }
    return;
}

exports.getModelByBrand = async (brand,req,res,next) => {
    try {
        await client.connect();
        const cursor = client.db('inventory').collection('shoe_model').find({brand: brand});
        cursor.sort();
        const results = await cursor.toArray();
        // await client.close();
        res.status(200).send({
            message: results,   
        });
        
    } catch(e) { 
        console.error('e: ', e);
        res.status(500).send({
            message: e
        });
    }
    
    return;
}

exports.getInstances = async (req,res,next) => {
    try {
        const id=req.originalUrl.split('/')[2]
        await client.connect();
        const cursor = client.db('inventory').collection('shoe_instance').find({model: id});
        cursor.sort();
        const results = await cursor.toArray();
        // await client.close();
        res.status(200).send({
            message: results,   
        });
        
    } catch(e) { 
        console.error('e: ', e);
        res.status(500).send({
            message: e
        });
    }
    
    return;
}

// exports.getModelBySize = async (size,req,res,next) => {
//     try {
//         await client.connect();
//         const cursor = client.db('inventory').collection('shoe_model').find({size: size});
//         cursor.sort();
//         const results = await cursor.toArray();
//         console.log('data: ', results);
//         await client.close();
//         res.status(200).send({
//             message: results,   
//         });
//     } catch(e) { 
//         console.log('e: ', e);
//         res.status(500).send({
//             message: e
//         });
//     }
//     return;
// }

exports.getModelByName = async (name,req,res,next) => {
    try {
        await client.connect();
        const cursor = await client.db('inventory').collection('shoe_model').find({model: name});
        const results = await cursor.toArray();
        const brandName = await client.db('inventory').collection('brands').findOne({_id: new ObjectId(results[0].brand)});
        results[0].brandName=brandName.name;
        // await client.close();
        res.status(200).send({
            message: results,   
        });
    } catch(e) { 
        console.error('e: ', e);
        res.status(500).send({
            message: e
        });
    }
    return;
}

exports.addShoeModel = [
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
            const cursorAdd = await client.db('inventory').collection('shoe_model').insertOne(req.body); //req.body.brand
            const cursorFind = client.db('inventory').collection('shoe_model').find();
            cursorFind.sort({"model":1});
            const results = await cursorFind.toArray();
            if(results.length)res.status(200).send({message: results});
        } catch(e) { 
            console.error('error adding shoe model: ', e);
        }
        return;
      },
];
