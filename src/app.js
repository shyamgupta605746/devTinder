const express = require('express');
const dbConnection = require("./config/database");
const User = require("./models/user");
const Cricket = require("./models/cricket");
const app = express();


app.post("/signup", async (req, res)=>{
    const user = new User({
        firstName: "shalini",
        lastName: "shyam gupta",
        emailId: "shalinigupta605746@gmail.com",
        password: "Shylini@080607",
    });
    await user.save();
    res.send("data added successfully into user table");
});

app.post("/cricket", async (req, res)=>{
    const cricket = new Cricket({
        pName: "hardik pandya",
        profes: "all rounder",
        number: "4",
    }); 
    try{
    await cricket.save();
    res.send("crickter id sended successfuly");
    }catch(err){
        res.status(400).send("lil problem while sending data");
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

