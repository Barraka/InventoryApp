var express = require('express');
var router = express.Router();
const testController = require('../controllers/testController');
const shoesController = require('../controllers/shoesController');
const shoeModelController = require('../controllers/shoeModelController');
const brandController = require('../controllers/brandController');

// router.get('/', function(req, res, next) {
//   res.json({name:'Bill', age:23});
// });

// router.get('/', function(req, res, next) {
//     console.log('responding on home page');
//     res.json({name:'Bill', age:23});
// });


router.get("/api/test", testController.test);
router.get("/api", testController.index);
router.get('/brands', brandController.getBrands);
router.get('/shoe_models', shoeModelController.getModels);

router.get("/shoes", (req, res, next)=>{
    // shoesController.index();
    // shoeModelController.getModelByBrand('63dbc2b90a6ed09bb19105d5');
    // console.log('initial req: ', req);
    shoeModelController.getModelByName('Sole Reaper',req, res, next)
        


    // shoeModelController.addShoeModel({name: 'Rea'});

});

// router.get("/add_shoe_model", (req, res, next)=> {
//     console.log('initial req: ', req);
//     shoeModelController.getModelByName('Sole Reaper', req, res, next);
// });
router.post('/add_shoe_model', shoeModelController.addShoeModel);

// router.post("/add_shoe_model", shoeModelController.addShoeModel);

// router.post("/add_shoe_model", shoeModelController.getModelByName('Sole Reaper'));

module.exports = router;
