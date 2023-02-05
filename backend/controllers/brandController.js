const async = require("async");
const { body, validationResult } = require("express-validator");
const {client} = require('../connect');
const Shoe_model = require('../models/shoe_model');
const Shoe_intance = require('../models/shoe_instance');
const ObjectId = require('mongodb').ObjectId;

exports.getBrands= async (req, res, next) => {
    try {
        await client.connect();
        const cursor = client.db('inventory').collection('brands').find();
        cursor.sort();
        const results = await cursor.toArray();
        await client.close();
        res.status(200).send({
            message: results,   
        });
    } catch(e) { 
        console.log('e: ', e);
    }
    return;
}