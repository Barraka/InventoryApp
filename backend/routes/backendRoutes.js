var express = require('express');
var router = express.Router();
const shoesController = require('../controllers/shoesController');
const shoeModelController = require('../controllers/shoeModelController');
const brandController = require('../controllers/brandController');
const shirtController = require('../controllers/shirtController');

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

module.exports = router;
