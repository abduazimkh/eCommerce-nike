const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Sales = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    total: {
        type: Number
    },
    profit: {
        type: Number
    }
})



module.exports = mongoose.model("Sales", Sales)