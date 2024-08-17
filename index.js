const express = require('express');
const cors = require("cors");
require("dotenv").config();
require("./conn/conn"); // Assuming this connects to your database

const user = require("./routes/user");
const Books = require("./routes/book");
const favourite = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1", user);
app.use("/api/v1", Books);
app.use("/api/v1", favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);

// Start the server
app.listen(1010, () => {
    console.log("Server started on port 1010");
});
