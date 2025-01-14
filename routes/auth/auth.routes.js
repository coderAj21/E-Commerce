const express=require("express");
const { login, signup, forgetPassword, otpVerification, resetPassword } = require("../../controller/authController");
const authRouter=express.Router();




authRouter.post("/login",login);
authRouter.post("/signin",signup);
authRouter.post("/forget_password",forgetPassword);
authRouter.post("/verify_otp",otpVerification);
authRouter.post("/reset_password",resetPassword);



module.exports=authRouter;