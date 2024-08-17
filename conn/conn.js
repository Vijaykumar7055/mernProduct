const mongoose = require("mongoose");
const conn = async ()=>{
    try {
        await mongoose.connect(`mongodb+srv://vijayweb18:viju1221@book.onnzr5q.mongodb.net/?retryWrites=true&w=majority&appName=Book`);
        console.log('MongoDB connected...');
      } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
      }

};

conn();