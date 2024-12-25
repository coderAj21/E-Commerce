const express=require("express");
const { createAddress } = require("../../controller/userController");
const userRouter=express.Router();

userRouter.post("/:user_id", createAddress);


module.exports=userRouter;