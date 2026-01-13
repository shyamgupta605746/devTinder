const express = require('express');
const dbConnection = require("./config/database");

const app = express();
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
 app.use(express.json());
 app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");
app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

dbConnection()
.then(()=>{
  console.log("Database connected successfully");
  app.listen(3000, ()=>{
    console.log('server connected successfully..'); 
});
}).catch(()=>{
    console.error("something went wrong");
});

