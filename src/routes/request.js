const express = require("express");
const requestRouter = express.Router();
const { userAuth } = require("../middleware/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

requestRouter.post(
  "/request/send/:status/:userId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;     
      const toUserId = req.params.userId; 
      const status = req.params.status;

      const allowedStatus = ["ignore", "interested"];
      if(!allowedStatus.includes(status)){
        return res.status(400).json({message: "Invalid Status type ! " + status });
      }
      const toUser = await User.findById(toUserId);
      if(!toUser){
        return res.status(404).json({
          message: "User Not Found",
        });
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if(existingConnectionRequest){
        return res.status(400).json({message: "Connection Request Already Exists!!"});
      }

      

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.status(201).json({
        message: req.user.firstName + " is " + status + " in " + toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
    }
  }
);

module.exports = requestRouter;
