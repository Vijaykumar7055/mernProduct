const router = require("express").Router();
const { authenticateToken } = require("./userAuth");
const Book = require("../models/book");
const Order = require("../models/order");
const User = require("../models/user");

// Place order
router.post("/place-order", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;

        for (const orderData of order) {
            const newOrder = new Order({ user: id, book: orderData._id });
            const orderDataFromDb = await newOrder.save();

            // Save Order to user model
            await User.findByIdAndUpdate(id, {
                $push: {
                    orders: orderDataFromDb._id
                },
            });

            // Clear cart
            await User.findByIdAndUpdate(id, {
                $pull: {
                    cart: orderData._id
                }
            });
        }

        return res.json({
            status: "success",
            message: "Order Placed Successfully",
        });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred while placing the order" });
    }
});

// Get order history of a particular user
router.get("/get-order-history", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({
            path: "orders",
            populate: { path: "book" }
        });

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        const orderData = userData.orders.reverse();
        return res.json({
            status: "success",
            data: orderData,
        });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred while retrieving order history" });
    }
});

// Get all orders
router.get("/get-all-orders", authenticateToken, async (req, res) => {
    try {
        const allOrders = await Order.find().populate({
            path: "book user"
        });
        return res.json({
            status: "success",
            data: allOrders,
        });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred while retrieving all orders" });
    }
});

module.exports = router;
