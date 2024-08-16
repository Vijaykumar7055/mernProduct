const mongoose = require("mongoose");

const order = new mongoose.Schema({
        User:{
            type: mongoose.Types.ObjectId,
            ref:"user"
        },
        book:{
            type: mongoose.Types.ObjectId,
            ref:"book"
        },
        status:{
            type:String,
           default: "order placed",
           enum:["order placed", "Out for delivery ", "delivered Canceld"],
        },
},
{timestamps:true}
);
module.exports = mongoose.model("order" , order)
