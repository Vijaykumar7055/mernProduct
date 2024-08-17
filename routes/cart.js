const router = require('express').Router();
const User = require("../models/user");
const {authenticateToken} = require("./userAuth"); 

// put book to cart

//add to cart
router.post("/add-to-cart", authenticateToken , async(req, res)=>{
    try {
        const  {bookid , id} = req.headers;
        const userData = await User.findById(id)
        const isBookinCart = userData.cart.includes(bookid);
        if (isBookinCart){
            return res.json({status: "success",
        message: "book is already in cards"});
        }
        await User.findByIdAndUpdate(id , {
            $push: {cart: bookid},

        });

        return res.json({
            status: "success",
            message:"book added to card"
        })
        
    } catch (error) {
        return res.status(500).json({message: "An error occure"})
    }
})


//remove from cart

router.put("/remove-from-cart/:bookid", authenticateToken ,  async(req, res)=>{
try {
    const {bookid} = req.params;
    const {id} = req.headers;
    await User.findByIdAndUpdate(id , {
        $pull: {cart: bookid},
        });

        return res.json({
            status:"Success ",
            message:"book removed frmo the cart"
        })
} catch (error) {
    return res.status(500).json({message: "An error occure"})
}
})




router.get("/get-user-cart", authenticateToken ,  async(req, res)=>{
try {
    const {id} = req.headers;
    const userData = await User.findById(id).populate("cart");
    const cart = userData.cart.reverse();
        return res.json({
            status:"Success ",
           data: cart,
        })
} catch (error) {
    return res.status(500).json({message: "An error occure"})
}
})



module.exports = router;