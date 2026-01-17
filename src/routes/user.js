const express = require("express");
const { userAuth } = require("../middleware/auth");
const userRouter = express.Router();
const ConnectionRequest = require("../models/connectionRequest");
const User = require('../models/user');
const populateList =
  "firstName lastName photoUrl age gender about skills";


userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", populateList);

    return res.json({
      message: "Received connection requests",
      data: connectionRequests,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
});


userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", populateList)
      .populate("toUserId", populateList);

    const data = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId; // ✅ missing return fixed
    });

    return res.json({ data });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
     limit = limit > 50 ? 50 : limit;

    const skip = (page - 1) * limit;

    const connectionRequest = await ConnectionRequest.find({
      $or: [ { fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id } ], 
    }).select("fromUserId toUserId");

    const hideUserFromFeed = new Set();
    connectionRequest.forEach((req)=>{
        hideUserFromFeed.add(req.fromUserId.toString());
        hideUserFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
    $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
    ],
    }).select(populateList).skip(skip).limit(limit);

    
    return res.json(users);
  } catch (err) {
    return res.status(400).json({
      message: "Error",
      error: err.message,
    });
  }
});


module.exports = userRouter;
