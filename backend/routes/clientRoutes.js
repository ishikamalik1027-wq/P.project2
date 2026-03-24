import express from "express";
const router = express.Router();
import Client from "../models/Client.js";
import auth from "../middleware/auth.js";

//Get clients
router.get("/", auth, async (req, res) => {

const clients = await Client.find({

userId: req.user.id

});

res.json(clients);

});

// ADD CLIENT
router.post("/", auth, async (req, res) => {
console.log("USER:", req.user);
const newClient = new Client({

name: req.body.name,
email: req.body.email,
company: req.body.company,
userId: req.user.id

});
await newClient.save();

res.json(newClient);

});

// DELETE client
router.delete("/:id", async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: "Client deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// UPDATE client
router.put("/:id", async (req, res) => {
  try {

    const updatedClient = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedClient);

  } catch (err) {

    res.status(500).json(err);

  }
});

export default router;


