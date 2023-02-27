var express = require('express');
var router = express.Router();
const shoeController = require('../controllers/shoeController');
const brandController = require('../controllers/brandController');
const shirtController = require('../controllers/shirtController');
const coatController = require('../controllers/coatController');
const accessoriesController = require('../controllers/accessoriesController');
const cors=require('cors');
const corsOptions = {
    origin: false,
    optionsSuccessStatus:200
}

//Brands
router.get('/brands', cors(corsOptions), brandController.getBrands);
router.get('/justBrands', cors(corsOptions), brandController.justBrands);
router.put('/brands/:id', cors(corsOptions), brandController.updateBrand);
router.post('/brands', cors(corsOptions), brandController.addBrand);
router.delete('/brands/:id', cors(corsOptions), brandController.deleteBrand);

//Shoes
router.get('/shoe_models', cors(corsOptions), shoeController.getModels);
router.put('/shoe_models/:id', cors(corsOptions), shoeController.updateModels);
router.post('/add_shoe_model', cors(corsOptions), shoeController.addShoeModel);
router.delete('/shoe_models/:id', cors(corsOptions), shoeController.deleteModel);

//Shirts
router.get('/shirts_models', cors(corsOptions), shirtController.getModels);
router.put('/shirt_models/:id', cors(corsOptions), shirtController.updateModels);
router.post('/add_shirt_model', cors(corsOptions), shirtController.addShirtModel);
router.delete('/shirt_models/:id', cors(corsOptions), shirtController.deleteModel);

//Coats
router.get('/coats_models', cors(corsOptions), coatController.getModels);
router.put('/coat_models/:id', cors(corsOptions), coatController.updateModels);
router.post('/add_coat_model', cors(corsOptions), coatController.addCoatModel);
router.delete('/coats_models/:id', cors(corsOptions), coatController.deleteModel);

//Accessories
router.get('/accessories', cors(corsOptions), accessoriesController.getModels);
router.put('/accessory/:id', cors(corsOptions), accessoriesController.updateModels);
router.post('/add_accessory', cors(corsOptions), accessoriesController.addModel);
router.delete('/accessory/:id', cors(corsOptions), accessoriesController.deleteModel);

module.exports = router;
