const express=require("express");
const { createFlavourInDatabase } = require("../../controller/flavourController");
const flavourRoutes=express.Router();


flavourRoutes.route("").post(createFlavourInDatabase);



module.exports=flavourRoutes;