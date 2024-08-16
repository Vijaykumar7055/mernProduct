const mongoose = require("mongoose");
const conn = async ()=>{
    try {
        await mongoose.connect(process.env.URI);
        console.log('MongoDB connected...');
      } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
      }

};

conn();