const express = require('express');
const cors = require("cors");
const app = express();
require("dotenv").config();
require("./conn/conn");
const user = require("./routes/user");
const Books = require("./routes/book");
const favourite = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order")

app.use(cors())
app.use(express.json());
//routes

app.use("/api/v1",user);
app.use("/api/v1",Books);
app.use("/api/v1",favourite);
app.use("/api/v1",Cart);
app.use("/api/v1",Order);

app.listen(process.env.PORT,()=>{
    console.log("server started in ")
})