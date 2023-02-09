const async = require("async");
const { body, validationResult } = require("express-validator");
const { MongoClient } = require('mongodb');
const {client} = require('../connect');
const Shoe_model = require('../models/shoe_model');
const Shoe_intance = require('../models/shoe_instance');

// const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@myatlasclusteredu.nnrvhxq.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri);


exports.index = async (req, res, next) => {
    try {
        await client.connect();
        const cursor = client.db('inventory').collection('shoe_instance').find();
        cursor.sort();
        const results = await cursor.toArray();
        await client.close();
    } catch(e) { 
        console.error('e: ', e);
    }
    return;
}

exports.getModels = async (req, res, next) => {
    try {
        await client.connect();
        const cursor = client.db('inventory').collection('shoe_instance').find();
        cursor.sort();
        const results = await cursor.toArray();
        await client.close();
    } catch(e) { 
        console.error('e: ', e);
    }
    return;
}

exports.populate = (req, res, next) => {
    const shoe = new Shoe_model({
        model: '12345',
        brand: 'Nike',
        description: "first"
    });
    
}
