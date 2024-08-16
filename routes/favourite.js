const router = require('express').Router();
const User = require("../models/user");
const {authenticateToken} = require("./userAuth"); 

//add book to favorite
router.put("/add-book-to-favourate", authenticateToken , async (req, res)=>{
    try {
        const {bookid , id}= req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if ( isBookFavourite){
            return res.status(200).json({message: "Book is alreay is my favourated"})
        }

        await User.findByIdAndUpdate(id , {$push: {favourites: bookid}});
        return res.status(200).json({message: "Bookadded to favourated"})
        
    } catch (error) {
        res.status(500).json({ message: "internal server error"});
    }
})


//delete book from favorites
router.delete("/remove-book-from-favourate", authenticateToken , async (req, res)=>{
    try {
        const {bookid , id}= req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if ( isBookFavourite){
            await User.findByIdAndUpdate(id , {$pull: {favourites: bookid}});
        }

       
        return res.status(200).json({message: "Book remove to favourated"})
        
    } catch (error) {
        res.status(500).json({ message: "internal server error"});
    }
})



//get favourite books of a particular user

router.get("/get-favourite-books",authenticateToken , async (req, res)=>{
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate('favourites')
        const favouriteBooks = userData.favourites;
        return res.json({
            status: "Success",
            data:favouriteBooks,
        })
    } catch (error) {
        return res.status(500).json({message: "An error occurred"})
    }
})



module.exports  = router;