const express = require('express');

const app = express();

app.get("/user/:userId/:name/:password",(req, res)=>{
   console.log(req.params);
   
   res.send({ firstName: "shyam", lastName: "Shalini gupta"});
});




app.listen(3000, ()=>{
    console.log('server connected successfully..'); 
});