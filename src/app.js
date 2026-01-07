const express = require('express');

const app = express();

 app.use("/test", (req, res)=>{
    res.send("im test jai ho");
 });

  app.use("/jaiho",(req, res)=>{
    res.send("hlo ji");
  });

 app.use((req, res)=>{
    res.send("hello you're using express server");
 });



app.listen(3000, ()=>{
    console.log('server connected successfully..'); 
});