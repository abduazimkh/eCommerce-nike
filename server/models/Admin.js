const mongoose = require("mongoose");
const Schema =  mongoose.Schema;

const Admin = new Schema({
    email: {
        type: String,
        required: true    
    },
    promotedBy: {
        type: String,
        required: true
    },
    promotedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Admin", Admin)