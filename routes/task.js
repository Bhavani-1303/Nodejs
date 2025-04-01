const express = require("express");
const { authMiddleware, roleAuth } = require("../middlewares/authMiddleware");
const Task = require("../models/task");
const router = express.Router();
router.post("/", authMiddleware, roleAuth(["FarmManager"]), async (req, res) => {
  try {
    const { title, description, assignedTo, deadline } = req.body;
    const task = new Task({ title, description, assignedTo, deadline });
    await task.save();
    res.status(201).json({ message: "Task Created!", task });
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
});
router.get("/", authMiddleware, roleAuth(["FarmAdmin", "FarmManager"]), async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo", "name email");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
});
router.put("/:id", authMiddleware, roleAuth(["FarmTechnician"]), async (req, res) => {
  try {
    const { status } = req.body;
    const task = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json({ message: "Task Updated!", task });
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
});

module.exports = router;
