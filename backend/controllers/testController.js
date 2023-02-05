const Shirt = require('../models/shirts');

exports.index = (req, res, next) => {
    // console.log('responding in controller index');
    // Shirt.find()
    // .exec((e,result)=> {
    //     if(e)return next(e);
    //     console.log('result: ', result);
    //     next();
    // });
    res.json({name:'Bill', age:99});
}

exports.test = (req, res) => {
    // console.log('responding in controller test');
    res.json({name:'John', age:01});
}