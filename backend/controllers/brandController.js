const async = require("async");
const { body, validationResult } = require("express-validator");
const {client} = require('../connect');
const ObjectId = require('mongodb').ObjectId;

let tempDataForGet=undefined;
let tempJustBrands=undefined;
let tempShoes=undefined;
let tempShirts=undefined;
let tempCoats=undefined;
let tempAccessories=undefined;

exports.emptyData = () => {
    tempDataForGet=undefined;
}

exports.refreshData = async () => {
    try {
        await client.connect();
        const cursor = client.db('inventory').collection('brands').find();
        cursor.sort({"name":1});
        const results = await cursor.toArray();
        const justBrands=[...results];
        let processed=0;
        let categoryShoes=[];
        let categoryShirts=[];
        let categoryCoats=[];
        let categoryAccessories=[];
        results.forEach(async (x, i)=> {
            const tempsum=await getsum(x)
            .then(res=> {
                if(res.category1.length)categoryShoes.push(...res.category1);
                if(res.category2.length)categoryShirts.push(...res.category2);
                if(res.category3.length)categoryCoats.push(...res.category3);
                if(res.category4.length)categoryAccessories.push(...res.category4); 
                x.count=res.sum; 
                x.products=res;
            });
            processed++;            
            if(processed>=results.length) {
                tempDataForGet=JSON.parse(JSON.stringify(results)); 
                tempJustBrands=JSON.parse(JSON.stringify(justBrands));
                tempShoes=JSON.parse(JSON.stringify(categoryShoes));
                tempShirts=JSON.parse(JSON.stringify(categoryShirts));
                tempCoats=JSON.parse(JSON.stringify(categoryCoats));
                tempAccessories=JSON.parse(JSON.stringify(categoryAccessories));  
                console.log('updated dataBrands, new data');
            }
        });  
    } catch(e) {
        console.error('error in refreshing get brands: ', e);
    }
}


exports.getBrands= async (req, res, next) => {
    if(!tempDataForGet) {
        try {
            await client.connect();
            const cursor = client.db('inventory').collection('brands').find();
            cursor.sort({"name":1});
            const results = await cursor.toArray();
            const justBrands=[...results];
            let processed=0;
            let categoryShoes=[];
            let categoryShirts=[];
            let categoryCoats=[];
            let categoryAccessories=[];
            results.forEach(async (x, i)=> {
                const tempsum=await getsum(x)
                .then(res=> {
                    if(res.category1.length)categoryShoes.push(...res.category1);
                    if(res.category2.length)categoryShirts.push(...res.category2);
                    if(res.category3.length)categoryCoats.push(...res.category3);
                    if(res.category4.length)categoryAccessories.push(...res.category4); 
                    x.count=res.sum; 
                    x.products=res;
                });
                processed++;            
                if(processed>=results.length) {
                    tempDataForGet=JSON.parse(JSON.stringify(results)); 
                    tempJustBrands=JSON.parse(JSON.stringify(justBrands));
                    tempShoes=JSON.parse(JSON.stringify(categoryShoes));
                    tempShirts=JSON.parse(JSON.stringify(categoryShirts));
                    tempCoats=JSON.parse(JSON.stringify(categoryCoats));
                    tempAccessories=JSON.parse(JSON.stringify(categoryAccessories));
                    res.status(200).send({
                        message: results, 
                        justBrands: justBrands, 
                        shoes: categoryShoes,
                        shirts: categoryShirts,
                        coats: categoryCoats,
                        accessories: categoryAccessories
                    });   
                }
            });        
        } catch(e) { 
            console.error('e in brand getBrands: ', e);
            res.status(500).send({message: e});
        }
    } else {
        try {
            res.status(200).send({
                message: tempDataForGet,
                justBrands: tempJustBrands, 
                shoes: tempShoes,
                shirts: tempShirts,
                coats: tempCoats,
                accessories: tempAccessories
            });
        } catch(e) {
            console.error('e in brand getmodels: ', e);
            res.status(500).send({message: e});
        }
    }    
}

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

exports.justBrands = async (req, res, next) => {
    try {
        await client.connect();
        let brandCursor= client.db('inventory').collection('brands').find();
        brandCursor = await brandCursor.toArray();
        res.status(200).send({
            message: brandCursor,   
        });
    } catch(e) { 
        console.error('e in coats justBrands: ', e);
        res.status(500).send({message: e});
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
        await refreshData();
    } catch(e) { 
        console.error('e in brands update: ', e);
        res.status(500).send({message: e});
    }
    return;
}

exports.addBrand = [
    body('model', 'Brand name must be at least 3 characters').exists().isString().trim().isLength({ min: 3 }).escape(),
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
            tempDataForGet=undefined;
            tempJustBrands=undefined;
        } catch(e) { 
            console.error('error adding Brand: ', e);
            res.status(500).send({message: e});
        }
        return;
      },
];



exports.deleteBrand = async (req, res, next) => {
    const id=req.originalUrl.split('/')[2]
    const sum= await getsum(id);

    if(sum.sum>0) {
        res.status(500).send({message: "There are products attached to the brand. Unable to complete deletion."});
    } else {
        try {
        
            await client.connect();
            const result = await client.db('inventory').collection('brands').deleteOne({_id:new ObjectId(id)});
            const cursorFind = client.db('inventory').collection('brands').find();
            cursorFind.sort({"name":1});
            const results = await cursorFind.toArray();
            if(results.length)res.status(200).send({message: results});
            tempDataForGet=undefined;
            tempJustBrands=undefined; 
        } catch(e) { 
            console.error('e in brands delete: ', e);
            res.status(500).send({message: 'could not delete', e});
        }
    }    
    return;
}

