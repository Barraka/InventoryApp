const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Shoe_Instance_Schema = new Schema({
    model: {type: String, required: true},
    size: {type: Number, required: true},
});

module.exports = mongoose.model("shoe_Instance_Schema", Shoe_Instance_Schema);
