const express=require("express");
const { createNutrition } = require("../controller/nutritionController");
const nutritionRouter=express.Router();





nutritionRouter.route("").post(createNutrition)






module.exports=nutritionRouter;