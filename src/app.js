const express = require('express');

const app = express();
const {auth, userAuth} = require('./middleware/auth');

app.use("/admin", auth);

app.get("/admin/getAllData", (req, res)=>{
    console.log("admin");
    res.send("admin all data request") 
});

app.get("/admin/deleteUser", (req, res)=>{
    console.log("admin");
    res.send("user deleted by admin successfully"); 
});

//user reuest
app.post("/user/login",(req, res)=>{
    res.send("login");
});

app.get("/user/dashboard", userAuth,(req, res)=>{
    console.log("user");
    res.send("user login request");
});

app.listen(3000, ()=>{
    console.log('server connected successfully..'); 
});