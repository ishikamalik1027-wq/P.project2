import express from "express";
const router = express.Router();

import Project from "../models/Project.js";
import auth from "../middleware/auth.js";


// GET ALL PROJECTS (Only logged-in user)
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find({
      userId: req.user.id
    }).populate("clientId", "name");

    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// ADD PROJECT
router.post("/", auth, async (req, res) => {
  try {
    const newProject = new Project({
      name: req.body.name,
      clientId: req.body.client,
      status: req.body.status,
      userId: req.user.id
    });

    const savedProject = await newProject.save();

    res.json(savedProject);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// UPDATE PROJECT
router.put("/:id", auth, async (req, res) => {
  try {

    const updatedProject = await Project.findOneAndUpdate(
      {
        _id: req.params.id,
        userId: req.user.id
      },
      req.body,
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(updatedProject);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


// DELETE PROJECT
router.delete("/:id", auth, async (req, res) => {
  try {

    const deletedProject = await Project.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});


export default router;
