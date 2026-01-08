const express = require('express');
const dbConnection = require("./config/database");
const User = require("./models/user");
const app = express();


 app.use(express.json());

app.post("/signup", async (req, res)=>{
    const user = new User(req.body);
    try{
    await user.save();
    res.send("data added successfully into user table");
    }catch(err){
        res.status(500).send("lil problem while sending data");
    }
});

//get user by email
app.get("/user", async (req, res) => {
    try{
    const userEmail = req.body.emailId;
    const user = await User.find({ emailId: userEmail });
    res.send(user);
    }catch(err){
        res.status(400).send("something went wrong");
    }
});

app.get("/feed", async (req, res)=>{
    try{
        const users = await User.find({});
        res.send(users);
    }catch(err){
        res.status(400).send("something went wrong");
    }
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

