const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Shoe_Model_Schema = new Schema({
    model: {type: String, required: true},
    brand: {type: String, required: true},
    description: {type: String}
});

module.exports = mongoose.model("shoe_Model", Shoe_Model_Schema);
