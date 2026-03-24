import express from "express";
const router = express.Router();

import Task from "../models/Task.js";
import auth from "../middleware/auth.js";


// GET TASKS
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.user.id
    });

    res.json(tasks);

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
});


// ADD TASK
router.post("/", auth, async (req, res) => {

  const newTask = new Task({
    title: req.body.title,
    dueDate: req.body.dueDate,
    userId: req.user.id
  });

  await newTask.save();
  res.json(newTask);
});

// DELETE TASK
router.delete("/:id", auth, async (req, res) => {

  await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id
  });

  res.json({ message: "Task deleted" });
});

// UPDATE TASK
router.put("/:id", auth, async (req, res) => {

  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    { new: true }
  );

  res.json(task);
});

export default router;
