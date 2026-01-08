const express = require('express');

const app = express();
const {auth, userAuth} = require('./middleware/auth');


//user reuest
app.post("/getUserData",(req, res)=>{
    try{
    // throw new Error("yesss daddy");
    
    res.send("login");
}
catch(err){
    res.status(500).send('err');
}
});

app.use("/", (err, req, res, next)=>{
   if(err){
    res.status(500).send("something wen't wrong");
   }
});

app.listen(3000, ()=>{
    console.log('server connected successfully..'); 
});