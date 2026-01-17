const express = require("express");
const authRouter = express.Router();
const { validatesingnUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");
//signUp
authRouter.post("/signup", async (req, res) => {
  try {
    validatesingnUpData(req);

    const { firstName, lastName, emailId, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();

    res.status(201).json({
      message: "Signup successful",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});


//Login
authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordValid = await user.validatePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = await user.getJWT();

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "lax",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res.status(200).json(user); // frontend dispatch(addUser)
  } catch (err) {
    res.status(500).json({
      message: "Login failed",
    });
  }
});


authRouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
});


module.exports = authRouter;
