var express = require('express');
var router = express.Router();
const shoeController = require('../controllers/shoeController');
const brandController = require('../controllers/brandController');
const shirtController = require('../controllers/shirtController');
const coatController = require('../controllers/coatController');
const accessoriesController = require('../controllers/accessoriesController');

//Brands
router.get('/brands', brandController.getBrands);
router.get('/justBrands', brandController.justBrands);
router.put('/brands/:id', brandController.updateBrand);
router.post('/brands', brandController.addBrand);
router.delete('/brands/:id', brandController.deleteBrand);

//Shoes
router.get('/shoe_models', shoeController.getModels);
router.put('/shoe_models/:id', shoeController.updateModels);
router.post('/add_shoe_model', shoeController.addShoeModel);
router.delete('/shoe_models/:id', shoeController.deleteModel);

//Shirts
router.get('/shirts_models', shirtController.getModels);
router.put('/shirt_models/:id', shirtController.updateModels);
router.post('/add_shirt_model', shirtController.addShirtModel);
router.delete('/shirt_models/:id', shirtController.deleteModel);

//Coats
router.get('/coats_models', coatController.getModels);
router.put('/coat_models/:id', coatController.updateModels);
router.post('/add_coat_model', coatController.addCoatModel);
router.delete('/coats_models/:id', coatController.deleteModel);

//Accessories
router.get('/accessories', accessoriesController.getModels);
router.put('/accessory/:id', accessoriesController.updateModels);
router.post('/add_accessory', accessoriesController.addModel);
router.delete('/accessory/:id', accessoriesController.deleteModel);

module.exports = router;
