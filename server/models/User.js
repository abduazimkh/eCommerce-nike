const mongoose = require("mongoose");

const User = new mongoose.Schema({
        email: {
            type: String,
            required: true,
            unique: true
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
        liked: {
            type: Array,
            default: []
        },
        registered_at: {
            type: Number
        },

    },
    { timestamps: true }
)

module.exports = mongoose.model("User", User);