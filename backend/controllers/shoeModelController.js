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

exports.getModelByBrand = async (brand,req,res,next) => {
    try {
        await client.connect();
        const cursor = client.db('inventory').collection('shoe_model').find({brand: brand});
        cursor.sort();
        const results = await cursor.toArray();
        // console.log('data: ', results);
        await client.close();
        res.status(200).send({
            message: results,   
        });
        
    } catch(e) { 
        console.log('e: ', e);
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
        await client.close();
        res.status(200).send({
            message: results,   
        });
    } catch(e) { 
        console.log('e: ', e);
        res.status(500).send({
            message: e
        });
    }
    return;
}

exports.addShoeModel = [
    body('brand').exists().trim().escape(),
    body('model', 'Model name must be at least 3 characters').exists().isString().trim().isLength({ min: 3 }).escape(),
    body('description').isString().trim().escape(),
    async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            console.log('errors found, ', errors);
            res.status(500).send({
                message: errors,   
            });
            return;
        }
        //No errors, need to validate data structure
        try {
            await client.connect();
            const cursor = await client.db('inventory').collection('brands').findOne({_id: new ObjectId(req.body.brand)}); //req.body.brand
            console.log('data: ', cursor);
            if(!cursor) {
                res.status(500).send({message:"Brand id not found"});
                return;
            }
            //Brand id has been found, proceed to add
            console.log('req: ', req.body);
            const cursorAdd = await client.db('inventory').collection('shoe_model').insertOne(req.body); //req.body.brand
            res.status(200).send(cursorAdd);
            await client.close();
        } catch(e) { 
            console.log('e: ', e);
        }
        return;
      },
    
    // console.log('in add shoe controller');
    //Crud operation
    // try {
    //     await client.connect();
    //     const cursor = client.db('inventory').collection('shoe_model').find({model: name});
    //     cursor.sort();
    //     const results = await cursor.toArray();
    //     console.log('data: ', results);
    //     await client.close();
    // } catch(e) { 
    //     console.log('e: ', e);
    // }
    // return;
]

// exports.addShoe = [
//     body("model","Model name must not be empty")
//         .trim()
//         .isLength({ min: 1 })
//         .escape(),
//     body("size","Model name must not be empty")
//         .trim()
//         .isLength({ min: 1 })
//         .escape(),
//     body("brand","Model name must not be empty")
//         .trim()
//         .isLength({ min: 1 })
//         .escape(),
//     body("description")
//         .optional({ checkFalsy: true })
//         .trim()
//         .escape(),

//     (req,res,next) => {
//         const errors = validationResult(req);
//         if(!errors.isEmpty()) {
//             console.log('Errors submitting new shoe');
//             return;
//         }
//         const shoe=new Shoes({
//             model: req.body.model,
//             size: req.body.size,
//             quantity: req.body.quantity,
//             brand: req.body.brand,
//             description: req.body.description,
//         });
//         shoe.save(e=> {
//             if(e)return next(e);
//             res.redirect(shoe.url);   
//         });
//     }
// ]