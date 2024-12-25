const express=require("express");
const router=express.Router();
const { login, signup, forgetPassword, otpVerification, resetPassword } = require("../controller/authController");
const {createCategory,getCategory}=require("../controller/categoryController");
const { createProduct, addProductImages, get_all_products } = require("../controller/productController");
const {auth}= require("../middleware/auth");
const { getAllBrands } = require("../controller/brandController");
const { createAddress } = require("../controller/userController");
const { createOrder } = require("../controller/orderController");
const { createFlavourForProduct } = require("../controller/flavourController");
const { getAllWeight, createWeightInDatabase } = require("../controller/weightController");
const authRouter = require("./auth/auth.routes");
const productRouter = require("./product/product.routes");
const catergoryRouter = require("./category/category.routes");
const brandRouter = require("./brand/brand.routes");
const orderRouter = require("./order/order.routes");
const weightRouter = require("./weight/weight.routes");
const userRouter = require("./user/user.routes");
const taxonomyRouter = require("./taxonomy.routes");

// authentication
router.use("/auth",authRouter);

// user
router.use ("/user",userRouter);

// products
router.use("/product",productRouter);

// catergory
router.use("/category",catergoryRouter);
// brand
router.use("/brand",brandRouter);


// order
router.use("/order",orderRouter);

// weight
router.use("/weight",weightRouter);

// taxonomy will contain the category , flavour and brand
router.use("/taxonomy",taxonomyRouter)


module.exports=router;