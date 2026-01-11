const express = require('express');
const dbConnection = require("./config/database");
const User = require("./models/user");
const app = express();
const {validatesingnUpData} = require('./utils/validation')
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
 app.use(express.json());
 app.use(cookieParser());
 const {userAuth} = require("./middleware/auth");
const user = require('./models/user');
//signUp
app.post("/signup", async (req, res) => {
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
app.post("/login", async(req, res)=>{
    try{
    const {emailId, password} = req.body;
    const user = await User.findOne({emailId: emailId});
    if(!user){
        throw new Error("Email Id is invalid");
    }
    const isPAsswordValid = await bcrypt.compare(password, user.password);
    if(isPAsswordValid){
        const token = await jwt.sign({ _id: user._id }, "DEV@Tinder$080607");
        res.cookie("token", token);
        res.send("Login Successfully");
    }else{
        throw new Error("Password is not correct");
    }
}catch(err){
    res.status(500).send("Error: " + err.message);
}
});

app.post("/profile", userAuth, async(req, res)=>{
   try{const user = req.user;
    res.send(user);
}catch(err){
    res.status(500).send("Error: " + err.message)
}
});

app.post("/sendConnectionRequest", userAuth, async(req, res)=>{
  const user =  req.user;
  res.send(user.firstName + " sent the connection request");
});

dbConnection()
.then(()=>{
  console.log("Database connected successfully");
  app.listen(3000, ()=>{
    console.log('server connected successfully..'); 
});
}).catch(()=>{
    console.error("something went wrong");
});

