const express=require("express");
const { createUnit } = require("../controller/unitController");
const unitRouter=express.Router();



unitRouter.route("").post(createUnit);



module.exports=unitRouter;