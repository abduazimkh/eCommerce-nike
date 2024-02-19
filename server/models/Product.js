const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema({
    product_name: {
        type: String,
        required: true,
        unique: true
    },
    product_images: {
        type: Array
    },
    likedby: {
        type: Array
    },
    likes: {
        type: Number,
        default: 0
    },
    category: {
        type: String
    },
    product_type: {
        type: String
    },
    description: {
        type: String
    },
    featured: {
        type: Boolean,
        required: true
    },
    visible_in_store: {
        type: Boolean,
        required: true
    },
    variants: {
        type: [Object],
        required: true
    },
    created_at: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Product", Product)

