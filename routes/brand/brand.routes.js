const express=require("express");
const { getAllBrands, createBrand } = require("../../controller/brandController");

const brandRouter=express.Router();


brandRouter.route("").get(getAllBrands).post(createBrand);


module.exports=brandRouter;