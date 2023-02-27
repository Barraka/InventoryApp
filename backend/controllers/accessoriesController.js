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
            const cursor = client.db('inventory').collection('accessories').find();
            cursor.sort({"model":1});
            const results = await cursor.toArray();   
            tempDataForGet=JSON.parse(JSON.stringify(results));      
            res.status(200).send({
                message: results,   
            });
        } catch(e) { 
            console.error('e in accessories getmodels: ', e);
            res.status(500).send({message: e});
        }
    } else {
        try {
            res.status(200).send({
                message: tempDataForGet,
            });
        } catch(e) {
            console.error('e in accessories getmodels: ', e);
            res.status(500).send({message: e});
        }
    }
}

exports.updateModels = async (req, res, next) => {
    try {
        const id=req.originalUrl.split('/')[2]
        const tempval={...req.body};
        delete tempval._id;
        await client.connect();
        const result = await client.db('inventory').collection('accessories').replaceOne({_id:new ObjectId(id)}, tempval);
        res.status(200).send({
            message: result,   
        });
        emptyData();
        refreshData();
        tempDataForGet=undefined;
    } catch(e) { 
        console.error('e in accessories update: ', e);
        res.status(500).send({message: e});
    }
    return;
}

exports.addModel = [
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
            const cursorAdd = await client.db('inventory').collection('accessories').insertOne(req.body); //req.body.brand
            res.status(200).send({message: cursorAdd});
            emptyData();
            refreshData();
            tempDataForGet=undefined;
        } catch(e) { 
            console.error('error adding coat model: ', e);
            res.status(500).send({message: e});
        }
        return;
      },
];

exports.deleteModel = async (req, res, next) => {
    try {
        const id=req.originalUrl.split('/')[2]
        const tempval={...req.body};
        await client.connect();
        const result = await client.db('inventory').collection('accessories').deleteOne({_id:new ObjectId(id)});
        const cursorFind = client.db('inventory').collection('accessories').find();
        cursorFind.sort({"model":1});
        const results = await cursorFind.toArray();
        if(results.length)res.status(200).send({message: results});
        emptyData();
        refreshData();
        tempDataForGet=undefined;
    } catch(e) { 
        console.error('e in accessories delete: ', e);
        res.status(500).send({message: e});
    }
    return;
}