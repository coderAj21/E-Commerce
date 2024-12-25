const express=require("express");
const { createCategory, getCategory } = require("../../controller/categoryController");

const catergoryRouter=express.Router();





catergoryRouter.route("").post(createCategory).get(getCategory);


module.exports=catergoryRouter;