const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");
const User = require("../models/user");
const router = express.Router();

// Sign Up
router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;

    // Validation checks
    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username length should be greater than 3" });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    if (password.length <= 5) {
      return res
        .status(400)
        .json({ message: "Password length should be more than 6" });
    }

    const hashpass = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashpass, address });
    await newUser.save();
    return res.status(200).json({ message: "Sign Up Successfully" });
  } catch (error) {
    console.error("Error during sign-up:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Sign In
router.post("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (isMatch) {
      const authClaims = { name: existingUser.username, role: existingUser.role };
      const token = jwt.sign({ authClaims }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      return res
        .status(200)
        .json({ Id: existingUser.id, role: existingUser.role, token });
    } else {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during sign-in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Get User Information
router.get("/get-user-information", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const data = await User.findById(id).select("-password");
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching user information:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Update Address
router.put("/update-address", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;
    await User.findByIdAndUpdate(id, { address });
    return res.status(200).json({ message: "Address updated successfully" });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
