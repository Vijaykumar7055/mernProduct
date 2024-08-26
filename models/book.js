const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,  // Corrected 'require' to 'required'
    },
    title: {
      type: String,
      required: true,  // Corrected 'require' to 'required'
    },
    author: {
      type: String,
      required: true,  // Corrected 'require' to 'required'
    },
    price: {
      type: Number,
      required: true,  // Corrected 'require' to 'required'
    },
    desc: {
      type: String,
      required: true,  // Corrected 'require' to 'required'
    },
    ram: {  // Changed 'rem' to 'ram' for consistency
      type: String,
      required: true,  // Corrected 'required' typo
    },
    rom: {
      type: String,
      required: true,  // Corrected 'required' typo
    },
    battery: {
      type: String,
      required: true,  // Corrected 'required' typo
    },
  },
  { timestamps: true }
);

// Use a singular, capitalized model name for convention
module.exports = mongoose.model("Book", bookSchema);
