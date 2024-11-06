const express=require("express");
const router=express.Router();
const { login, signup, forgetPassword, otpVerification, resetPassword } = require("../controller/authController");
const {createCategory,getCategory}=require("../controller/categoryController");
const { createProduct, addProductImages, get_all_products } = require("../controller/productController");
const {auth}= require("../middleware/auth");

// authentication
router.post("/login",login);
router.post("/signin",signup);
router.post("/forget_password",forgetPassword);
router.post("/verify_otp",otpVerification);
router.post("/reset_password",resetPassword);


// products
router.post("/create_product",createProduct);
router.post("/add_product_images",addProductImages);
router.get("/get_products",get_all_products);


// catergory
router.post("/create_category",createCategory);
router.get("/get_category",getCategory);


module.exports=router;