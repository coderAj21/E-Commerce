const express=require("express");
const router=express.Router();
const { login, signup } = require("../controller/authController");
const {createCategory,getCategory}=require("../controller/categoryController");
const { createProduct, addProductImages } = require("../controller/productController");

// authentication
router.post("/login",login);
router.post("/signup",signup);


// products
router.post("/create_product",createProduct);
router.post("/add_product_images",addProductImages);


// catergory
router.post("/create_category",createCategory);
router.get("/get_category",getCategory);

module.exports=router;