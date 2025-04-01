const express = require("express");
const router = express.Router();
const Farm = require("../models/farm");
const authMiddleware = require("../middlewares/auth");
const roleMiddleware = require("../middlewares/roleAuth");
router.post("/", authMiddleware, roleMiddleware(["FarmAdmin"]), async (req, res) => {
  try {
    const { name, location } = req.body;
    const farm = new Farm({ name, location });
    await farm.save();
    res.status(201).json({ message: "Farm created successfully", farm });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});
router.get("/", authMiddleware, roleMiddleware(["FarmAdmin", "FarmManager"]), async (req, res) => {
  try {
    const farms = await Farm.find();
    res.status(200).json(farms);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;
