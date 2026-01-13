const express = require("express");
const authRouter = express.Router();
const {validatesingnUpData} = require('../utils/validation');
const bcrypt = require("bcrypt");
const User = require("../models/user");
//signUp
authRouter.post("/signup", async (req, res) => {
    try {
        validatesingnUpData(req);

        const { firstName, lastName, emailId, password } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);
console.log(passwordHash);

        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });

        await user.save();
        res.send("data added successfully into user table");
    } catch (err) {
        res.status(500).send("Error: " + err.message);
    }
});

//Login
authRouter.post("/login", async(req, res)=>{
    try{
    const {emailId, password} = req.body;
    const user = await User.findOne({emailId: emailId});
    if(!user){
        throw new Error("Email Id is invalid");
    }
    const isPAsswordValid = await user.validatePassword(password);
    if(isPAsswordValid){
        const token = await user.getJWT();
        res.cookie("token", token,{
            expires: new Date(Date.now() + 8 * 3600000),
        });
        res.send("Login Successfully");
    }else{
        throw new Error("Password is not correct");
    }
}catch(err){
    res.status(500).send("Error: " + err.message);
}
});

authRouter.post("/logout", async(req, res)=>{
    try{
        res.cookie("token", null,{
        expires: new Date(Date.now()),
    });
    res.send("User Logout Successfully");
}catch(err){
    res.status(400).send("Error: " + err.message);
}
});

module.exports = authRouter;