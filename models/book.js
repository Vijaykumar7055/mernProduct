// const mongoose = require("mongoose");

// const book = new mongoose.Schema({
//      url:{
//         type: String,
//         require: true,
//      },
//      title:{
//         type: String,
//         require: true,
//      },
//      author:{
//         type: String,
//         require: true,
//      },
//      price:{
//         type: Number,
//         require: true,
//      },
//      desc:{
//         type: String,
//         require: true,
//      },
//      language:{
//         type: String,
//         require: true,
//      },
// },
// {timestamps:true}
// );
// module.exports = mongoose.model("book" , book)



const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
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
    language: {
        type: String,
        required: true,  // Corrected 'require' to 'required'
    }
}, { timestamps: true });

module.exports = mongoose.model("books", bookSchema);  // Capitalized model name for consistency
