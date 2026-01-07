const express = require('express');

const app = express();

app.get("/user",(req, res)=>{
   res.send("im user post data");
});

app.post("/user",(req, res)=>{
   res.send("im post data of user");
});

app.delete("/user", (req,res)=>{
   res.send("im delete jai ho");
});

 app.use("/test", (req, res)=>{
    res.send("im test jai ho");
 });


app.listen(3000, ()=>{
    console.log('server connected successfully..'); 
});