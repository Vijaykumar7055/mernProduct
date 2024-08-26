const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken")
const Book = require("../models/book")
const {authenticateToken} = require("./userAuth")


//add book -- admin

router.post("/add-book", authenticateToken , async(req, res)=>{
    try {
        const {id} = req.headers;
       const user =  await User.findById(id);
if(user.role !=="admin"){
return res.status(400).json({message:"you are not having perform admin work" })
}
        const book = new Book({  
            url: req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            desc:req.body.desc,
            rem:req.body.rem,
            rom:req.body.rom,
            battery:req.body.battery,
        });
        await book.save();

    res.status(200).json({Message:"book created successfully"})
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
})

//update book --admin

router.put("/update-book", authenticateToken , async (req ,res)=>{
try {
    const {bookid}= req.headers;
    await Book.findByIdAndUpdate(bookid,{
            url:req.body.url,
            title:req.body.title,
            author:req.body.author,
            price:req.body.price,
            url:req.body.url,
            url:req.body.url,
            rem:req.body.rem,
            rom:req.body.rom,
            battery:req.body.battery,
    });

    return res.status(200).json({
        message: "book updated successfully!",
    })
} catch (error) {
    return res.status(500).json({message: "an error occurred"})
}
})


router.delete("/delete-book", authenticateToken , async (req,res)=>{
try {
   const { bookid } = req.headers;
   await Book.findByIdAndDelete(bookid);
   return res.status(200).json({
    message:"book deleted successfully",
   });
} catch (error) {
    return res.status(500).json({message:"An error occurred"});
}
})


router.get("/get-all-books", async(req , res)=>{
    try {
        const books = await Book.find().sort({createdAt: -1}).limit();
        return res.json({
            status:"success",
            data:books,
        })
    } catch (error) {
        return res.status(500).json({message:"An error occurred"});
    }
})


router.get("/get-recent-books", async (req , res)=>{
    try {
        const books = await Book.find().sort({createAt: -1}).limit(4);
        return res.json({
            status:"success",
            data:books,
        });
    } catch (error) {
        return res.status(500).json({message:"An error occurred"});
    }
})

//get book by id 

router.get("/get-book-by-id/:id", async(req, res)=>{
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.json({
            status: "success",
            data:book,
        })
    } catch (error) {
       
    }
})


module.exports = router