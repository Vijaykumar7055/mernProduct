const mongoose = require("mongoose");
const conn = async ()=>{
try {
    await mongoose.connect('mongodb+srv://vijayweb18:viju1221@book.onnzr5q.mongodb.net/?retryWrites=true&w=majority&appName=Book');
    console.log("contteted to database")
} catch (error) {
    console.log(error)

}
};

conn();