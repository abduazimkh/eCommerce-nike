const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Category = new Schema({
    category_name: {
        type: String,
        required: true,
        unique: true
    },
    category_image: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Category", Category)