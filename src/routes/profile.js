const express =  require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middleware/auth");
const {validateEditprofileData} = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const validator = require("validator");


profileRouter.get("/profile/view", userAuth, async(req, res)=>{
   try{const user = req.user;
    res.send(user);
}catch(err){
    res.status(500).send("Error: " + err.message)
}
});

profileRouter.post("/profile/edit", userAuth, async(req, res)=>{
    try{
      if(!validateEditprofileData){
        throw new Error("Invalid Edit Requesst");
      }
      const loggedInuser = req.user;
      Object.keys(req.body).forEach((key)=>(loggedInuser[key] = req.body[key]));
      await loggedInuser.save();

      res.send(`${loggedInuser.firstName}, your profile is updated succcessfully`);
    }
    catch(err){
        res.status(400).send("Error: " + err.message);
    }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      throw new Error("Old password and new password are required");
    }
    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("New password is not strong enough");
    }
    const user = req.user;
    const isPasswordValid = await bcrypt.compare(
      oldPassword,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error("Old password is incorrect");
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.send({
      message: "Password updated successfully ✅",
    });

  } catch (err) {
    res.status(400).send({
      error: err.message,
    });
  }
});

module.exports = profileRouter;