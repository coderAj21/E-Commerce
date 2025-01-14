const express=require("express");
const { addImage } = require("../controller/imageController");
const imageRouter=express.Router();

imageRouter.route("").post(addImage);


module.exports=imageRouter;