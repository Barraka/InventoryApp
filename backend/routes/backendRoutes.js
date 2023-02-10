var express = require('express');
var router = express.Router();
const shoesController = require('../controllers/shoesController');
const shoeModelController = require('../controllers/shoeModelController');
const brandController = require('../controllers/brandController');
const shirtController = require('../controllers/shirtController');
const coatController = require('../controllers/coatController');
const accessoriesController = require('../controllers/accessoriesController');

router.get('/brands', brandController.getBrands);

//Shoes
router.get('/shoe_models', shoeModelController.getModels);
router.put('/shoe_models/:id', shoeModelController.updateModels);
router.put('/clean_data', shoeModelController.cleanData);
router.delete('/shoe_models/:id', shoeModelController.deleteModel);
router.get('/shoe_instances/:id', shoeModelController.getInstances);
router.get("/shoes", (req, res, next)=>{
    shoeModelController.getModelByName('Sole Reaper',req, res, next)
});
router.post('/add_shoe_model', shoeModelController.addShoeModel);

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
