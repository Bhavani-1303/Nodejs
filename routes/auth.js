const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
console.log("✅ Auth Routes Loaded");
router.get("/", (req, res) => {
  console.log("✅ GET /api/auth Hit");
  res.json({ message: "Auth API Working!" });
});
router.post("/signup", async (req, res) => {
  try {
    console.log("✅ POST /api/auth/signup Hit");
    const { name, email, password, role } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      console.log("⚠️ User already exists");
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    console.log("✅ User registered successfully");
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.json({ token, role: user.role });
    } catch (error) {
      console.error("❌ Login Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
module.exports = router;
