const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const {authenticateToken} = require("./userAuth")
// Sign Up
router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    // Check username length
    if (username.length < 4) {
      return res.status(400).json({ message: "Username length should be greater than 3" });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Check password length
    if (password.length <= 5) {
      return res.status(400).json({ message: "Password length should be more than 6" });
    }

    const hashpass = await  bcrypt.hash(password , 10)

    // Create a new user
    const newUser = new User({
      username:username,
     email: email,
      password: hashpass,
      address:address,
    });

    await newUser.save();
    return res.status(200).json({ message: "Sign Up Successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});


 

// Sign In

router.post("/sign-in", async (req, res) => {
  try {
    const {username, password} = req.body;
    const existingUser = await User.findOne({username});
if(!existingUser){
    return res.status(400).json({ message: "invaild credentials" });
}

await bcrypt.compare(password, existingUser.password , (err, data)=>{
if (data){
    const authClaims = [
        {
            name:existingUser.username,
        },

        {
            role:existingUser.role,
        }
    ]
    const token = jwt.sign({authClaims},"bookstore123",{
        expiresIn: "30d"
    } )
    return res.status(200).json({ Id: existingUser.id , role:existingUser.role, token:token});     
}

else{
    return res.status(400).json({ message: "invaild credentials" });
}
})
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});


//get user-information

router.get("/get-user-information", authenticateToken, async (req , res)=>{
    try {
      const {id}= req.headers;
      const data = await User.findById(id).select("-password");
      return res.status(200).json(data);
    } catch (error) {
       res.status(500).json({ message: "Internal server error" });
    }
})


// update address

router.put("/update-address", authenticateToken , async (req, res)=>{
  try {
    const { id } = req.headers;
    const {address} = req.body;
    await User.findByIdAndUpdate(id , {address:address})
    return res.status(200).json({message: "message updated successfully"});
    } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
})

module.exports = router;
