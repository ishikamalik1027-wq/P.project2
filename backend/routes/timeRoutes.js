import express from "express";
const router = express.Router();

import TimeLog from "../models/TimeLog.js";
import auth from "../middleware/auth.js";


//  START TIMER
router.post("/start", auth, async (req, res) => {
  try {
    const log = new TimeLog({
      userId: req.user.id,
      projectId: req.body.projectId,
      startTime: new Date(),
      billed: false
    });

    await log.save();
    res.json(log);

  } catch (err) {
    res.status(500).json({ msg: "Error starting timer" });
  }
});

// STOP TIMER
router.post("/stop/:id", auth, async (req, res) => {
  try {
    const log = await TimeLog.findOne({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!log) {
      return res.status(404).json({ msg: "Log not found" });
    }

    log.endTime = new Date();
    log.duration = (log.endTime - log.startTime) / 3600000; // hours

    await log.save();
    res.json(log);

  } catch (err) {
    res.status(500).json({ msg: "Error stopping timer" });
  }
});



// MANUAL TIME ENTRY

router.post("/", auth, async (req, res) => {
  try {
    const newLog = new TimeLog({
      ...req.body,
      userId: req.user.id,
      billed: false
    });

    await newLog.save();
    res.json(newLog);

  } catch (err) {
    res.status(500).json({ msg: "Error adding time" });
  }
});

// GET ALL LOGS (USER ONLY)
router.get("/", auth, async (req, res) => {
  try {
    const logs = await TimeLog.find({
      userId: req.user.id
    }).populate("projectId");

    res.json(logs);

  } catch (err) {
    res.status(500).json({ msg: "Error fetching logs" });
  }
});

// GET UNBILLED LOGS
router.get("/unbilled", auth, async (req, res) => {
  try {
    const logs = await TimeLog.find({
      userId: req.user.id,
      billed: false
    }).populate({
      path: "projectId",
      populate: {
        path: "clientId"
      }
    });

    res.json(logs);

  } catch (err) {
    res.status(500).json({ msg: "Error fetching unbilled logs" });
  }
});

// MARK AS BILLED
router.put("/mark-billed", auth, async (req, res) => {
  try {
    const { ids } = req.body;

    await TimeLog.updateMany(
      {
        _id: { $in: ids },
        userId: req.user.id
      },
      {
        billed: true
      }
    );

    res.json({ msg: "Marked as billed" });

  } catch (err) {
    res.status(500).json({ msg: "Error updating logs" });
  }
});


export default router;
