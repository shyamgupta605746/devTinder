const express = require('express');
const { userAuth } = require('../middleware/auth');
const userRouter = express.Router();
const ConnectionRequest = require('../models/connectionRequest');

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", ["firstName", "lastName", "photoUrl", "age", "gender", "about", "skills"])

    return res.json({ message: "Received connection requests", data: connectionRequests,});
  } catch (err) {
     return res.status(500).json({ message: "Something went wrong", error: err.message,});
  }
});



module.exports = userRouter;