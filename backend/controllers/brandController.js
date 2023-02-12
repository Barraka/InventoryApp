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
        cursor.sort({"name":1});
        const results = await cursor.toArray();
        let processed=0;
        results.forEach(async (x, i)=> {
            const tempsum=await getsum(x);  
            x.count=tempsum.sum; 
            x.products=tempsum;
            processed++;
            if(processed>=results.length) {
                res.status(200).send({
                    message: results,  
                });   
            }
        });
        async function getsum(x) {
            const productCursor1 = client.db('inventory').collection('shoe_model').find({brand:x._id.toString()});
            const productCursor2 = client.db('inventory').collection('shirt_model').find({brand:x._id.toString()});
            const productCursor3 = client.db('inventory').collection('coat_model').find({brand:x._id.toString()});            
            const productCursor4 = client.db('inventory').collection('accessories').find({brand:x._id.toString()});
            const count1 = await productCursor1.toArray();
            const count2 = await productCursor2.toArray();
            const count3 = await productCursor3.toArray();
            const count4 = await productCursor4.toArray();
            const len1= count1.length;
            const len2= count2.length;
            const len3= count3.length;
            const len4= count4.length;
            const sum = len1+len2+len3+len4; 
            return {sum:sum, category1: count1, category2: count2, category3: count3, category4: count4}
        }
        // await client.close();
        
    } catch(e) { 
        console.error('e: ', e);
    }
    return;
}

exports.updateBrand = async (req, res, next) => {
    try {
        const id=req.originalUrl.split('/')[2]
        const tempval={...req.body};
        delete tempval._id;
        await client.connect();
        const result = await client.db('inventory').collection('brands').updateOne({_id:new ObjectId(id)}, {"$set": {name: tempval.name, picture: tempval.picture}});
        res.status(200).send({
            message: result,   
        });
    } catch(e) { 
        console.error('e: ', e);
    }
    return;
}

exports.addBrand = [
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
            const data={};
            data.name=req.body.model;
            data.picture=req.body.picture;
            await client.connect();
            const cursorAdd = await client.db('inventory').collection('brands').insertOne(data); //req.body.brand
            const cursorFind = client.db('inventory').collection('brands').find();
            cursorFind.sort({"model":1});
            const results = await cursorFind.toArray();
            if(results.length)res.status(200).send({message: results});
        } catch(e) { 
            console.error('error adding coat model: ', e);
        }
        return;
      },
];

async function getsum(x) {
    const productCursor1 = client.db('inventory').collection('shoe_model').find({brand:x});
    const productCursor2 = client.db('inventory').collection('shirt_model').find({brand:x});
    const productCursor3 = client.db('inventory').collection('coat_model').find({brand:x});            
    const productCursor4 = client.db('inventory').collection('accessories').find({brand:x});
    const count1 = await productCursor1.toArray();
    const count2 = await productCursor2.toArray();
    const count3 = await productCursor3.toArray();
    const count4 = await productCursor4.toArray();
    const len1= count1.length;
    const len2= count2.length;
    const len3= count3.length;
    const len4= count4.length;
    const sum = len1+len2+len3+len4; 
    return {sum:sum, category1: count1, category2: count2, category3: count3, category4: count4}
}

exports.deleteBrand = async (req, res, next) => {
    const id=req.originalUrl.split('/')[2]
    const sum= await getsum(id);
    if(sum.sum>0) {
        console.log('There are products found');
        res.status(500).send({message: "There are products attached to the brand. Unable to complete deletion."});
    } else {
        try {
        
            await client.connect();
            const result = await client.db('inventory').collection('brands').deleteOne({_id:new ObjectId(id)});
            const cursorFind = client.db('inventory').collection('brands').find();
            cursorFind.sort({"name":1});
            const results = await cursorFind.toArray();
            if(results.length)res.status(200).send({message: results});
        } catch(e) { 
            console.error('e: ', e);
        }
    }    
    return;
}