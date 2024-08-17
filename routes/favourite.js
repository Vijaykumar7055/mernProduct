const router = require('express').Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

// Add book to favorite
router.put("/add-book-to-favorite", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookFavorite = userData.favourites.includes(bookid);
        
        if (isBookFavorite) {
            return res.status(200).json({ message: "Book is already in your favorites" });
        }

        await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
        return res.status(200).json({ message: "Book added to favorites" });

    } catch (error) {
        console.error("Error adding book to favorites:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
});

// Delete book from favorites
router.delete("/remove-book-from-favorite", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookFavorite = userData.favourites.includes(bookid);

        if (isBookFavorite) {
            await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } });
            return res.status(200).json({ message: "Book removed from favorites" });
        }

        return res.status(404).json({ message: "Book not found in favorites" });

    } catch (error) {
        console.error("Error removing book from favorites:", error);
        res.status(500).json({ message: "Internal server error", error });
    }
});

// Get favorite books of a particular user
router.get("/get-favorite-books", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate('favourites');
        const favoriteBooks = userData.favourites;
        
        return res.json({
            status: "Success",
            data: favoriteBooks,
        });

    } catch (error) {
        console.error("Error fetching favorite books:", error);
        return res.status(500).json({ message: "An error occurred", error });
    }
});

module.exports = router;
