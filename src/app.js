const express = require('express');

const app = express();

app.get("/user/:userId/:name/:password",(req, res, next)=>{
   console.log(req.params);
   next()
   res.send("first route execute");
},
(req, res, next)=>{
    console.log("second route execute");
    res.send("second route execute")
    next();
},
(req, res)=>{
    console.log("third route execute");
    res.send("third route execute");
}
);




app.listen(3000, ()=>{
    console.log('server connected successfully..'); 
});