const express=require("express");
const { getAllBrands } = require("../../controller/brandController");

const brandRouter=express.Router();


brandRouter.route("").get(getAllBrands);


module.exports=brandRouter;