const express=require("express");
const router=express.Router();
const authRouter = require("./auth/auth.routes");
const productRouter = require("./product/product.routes");
const catergoryRouter = require("./category/category.routes");
const brandRouter = require("./brand/brand.routes");
const orderRouter = require("./order/order.routes");
const weightRouter = require("./weight/weight.routes");
const userRouter = require("./user/user.routes");
const taxonomyRouter = require("./taxonomy.routes");
const flavourRoutes = require("./flavours/flavour.routes");
const unitRouter = require("./unit.routes");
const nutritionRouter = require("./nutrition.routes");
const imageRouter = require("./image.routes");

// authentication
router.use("/auth",authRouter);

// user
router.use ("/user",userRouter);

// products
router.use("/product",productRouter);


// order
router.use("/order",orderRouter);

// weight
router.use("/weight",weightRouter);
// catergory
router.use("/category",catergoryRouter);
// brand
router.use("/brand",brandRouter);
// flavour
router.use("/flavour",flavourRoutes);
// Unit
router.use("/unit",unitRouter);
// Nutrition 
router.use("/nutrition",nutritionRouter);

// Images
router.use("/image",imageRouter);


// taxonomy will contain the category , flavour and brand
router.use("/taxonomy",taxonomyRouter)


module.exports=router;