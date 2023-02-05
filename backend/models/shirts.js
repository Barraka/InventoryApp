const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ShirtSchema = new Schema({
    size: {
        type: String,
        required: true,
        enum: ["XS","S","M","L","XL","XXL"],
        default: "M",
    },
    color: {
        type: String,
        required: true,
        enum: ["Blue","White","Black","Pink"],
        default: "Blue",
    },
    quantity: {type: Number, required: true},
    location: [{type: Schema.Types.ObjectId, required: true}],
    picture: {type: Number}
});

module.exports = mongoose.model("shirt_schema", ShirtSchema);
