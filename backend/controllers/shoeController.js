const async = require("async");
const { body, validationResult } = require("express-validator");
const {client} = require('../connect');
const ObjectId = require('mongodb').ObjectId;
const {refreshData, emptyData} = require('./brandController');

let tempDataForGet=undefined;

exports.getModels = async (req, res, next) => {
    if(!tempDataForGet) {
        try {
            await client.connect();
            const cursor = client.db('inventory').collection('shoe_model').find();
            cursor.sort({"model":1});
            const results = await cursor.toArray();
            tempDataForGet=JSON.parse(JSON.stringify(results));        
            res.status(200).send({
                message: results,   
            });
        } catch(e) { 
            console.error('e in shoe_model getmodels: ', e);
            res.status(500).send({message: e});
        }
    } else {
        try {
            res.status(200).send({
                message: tempDataForGet,
            });
        } catch(e) {
            console.error('e in shoe_model getmodels: ', e);
            res.status(500).send({message: e});
        }
    }
    return;
}

exports.getOne = async (req, res, next) => {
    try {
        await client.connect();
        const cursor = await client.db('inventory').collection('shoe_model').findOne();
        res.status(200).send({
            message: cursor,   
        });
    } catch(e) { 
        console.error('e in shoes getmodels: ', e);
        res.status(500).send({message: e});
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
        emptyData();
        refreshData();
    } catch(e) { 
        console.error('e in shoes update: ', e);
        res.status(500).send({message: e});
    }
    return;
}



exports.deleteModel = async (req, res, next) => {
    try {
        const id=req.originalUrl.split('/')[2]
        await client.connect();
        const result = await client.db('inventory').collection('shoe_model').deleteOne({_id:new ObjectId(id)});
        const cursorFind = client.db('inventory').collection('shoe_model').find();
        cursorFind.sort({"model":1});
        const results = await cursorFind.toArray();
        if(results.length)res.status(200).send({message: results});
        emptyData();
        refreshData();
    } catch(e) { 
        console.error('e in shoes delete: ', e);
        res.status(500).send({message: e});
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
            res.status(200).send({message: cursorAdd});
            emptyData();
            refreshData();
        } catch(e) { 
            console.error('error adding shoe model: ', e);
        }
        return;
      },
];
