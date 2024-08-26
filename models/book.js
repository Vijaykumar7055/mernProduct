const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    rem: {
        type: String,  // Assuming RAM is represented as a string (e.g., "4GB")
        required: true,
    },
    rom: {
        type: String,  // Assuming ROM is represented as a string (e.g., "64GB")
        required: true,
    },
    battery: {
        type: String,  // Assuming battery is represented as a string (e.g., "4000mAh")
        required: true,
    },
    camera: {
        type: String,  // Assuming camera is represented as a string (e.g., "12MP")
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model("Book", bookSchema);  // Consistent model name capitalization
