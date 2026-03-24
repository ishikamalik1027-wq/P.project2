import mongoose from "mongoose";

const schema = new mongoose.Schema({
  userId: String,
  projectId: String,
  startTime: Date,
  endTime: Date,
  duration: Number,
  billed: { type: Boolean, default: false }
});

const TimeLog = mongoose.model("TimeLog",schema);

export default TimeLog;