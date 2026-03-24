import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true
  },

  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true
  },

  status: {
    type: String,
    enum: ["Active", "Pending"],
    default: "Active"
  },

  userId: {   // 🔥 ADD THIS (MISSING)
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }

});

const Project = mongoose.model("Project", projectSchema);

export default Project;
