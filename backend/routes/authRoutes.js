import express from "express";
const router = express.Router()

import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// SIGNUP
router.post("/signup", async (req, res) => {

  const { name, email, password } = req.body;

  try {

    // check if user exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    //password hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    await newUser.save();

    res.json(newUser); // success

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }

});


// LOGIN
router.post("/login", async (req, res) => {

  const { name ,email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
  return res.status(400).json({ msg: "Wrong password" });
}


    // ✅ TOKEN
    const token = jwt.sign(
      { id: user._id },
      "secretkey",
      { expiresIn: "1h" }
    );

    res.json({ token }); // 👈 MUST

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }

});

export default router;