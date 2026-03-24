import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  name: String,
  email: String,
  company: String,
  userId:{
  type:mongoose.Schema.Types.ObjectId,
  ref:"User"
}

});

const Client = mongoose.model("Client", clientSchema);

export default Client;
