const express = require("express");
const { authMiddleware, roleAuth } = require("../middlewares/authMiddleware");
const User = require("../models/user");
const Task = require("../models/task");
const router = express.Router();
router.get("/admin/users", authMiddleware, roleAuth(["FarmAdmin"]), async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
});
router.post("/manager/tasks", authMiddleware, roleAuth(["FarmManager"]), async (req, res) => {
  try {
    const { title, description, assignedTo, deadline } = req.body;
    const task = new Task({ title, description, assignedTo, deadline });
    await task.save();
    res.status(201).json({ message: "Task assigned successfully", task });
  } catch (error) {
    res.status(500).json({ message: "Error assigning task", error });
  }
});
router.get("/technician/tasks/:id", authMiddleware, roleAuth(["FarmTechnician"]), async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.params.id});
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks", error });
  }
});
router.get("/user/profile/:id", authMiddleware, roleAuth(["EndUser"]), async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
});

module.exports = router;

