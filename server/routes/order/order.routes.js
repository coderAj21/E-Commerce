const express=require("express");
const { createOrder } = require("../../controller/orderController");

const orderRouter=express.Router();


orderRouter.route("").post(createOrder);



module.exports=orderRouter;