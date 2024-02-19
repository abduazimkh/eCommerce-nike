const mongoose = require("mongoose");

const User = new mongoose.Schema({
        email: {
            type: String,
            required: true
        },
        first_name: {
            type: String,
            required: true
        },
        role: {
            type: String,
            required: true,
            enum: ["admin", "user"],
            default: "user"
        },
        photo_url: {
            type: String
        },
        purchased: {
            type: Array,
            default: []
        },
        liked: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }],
        registered_at: {
            type: Number
        },

    },
    { timestamps: true }
)

module.exports = mongoose.model("User", User);