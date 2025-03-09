const express = require("express");
const { createProduct, get_all_products, filterProduct, get_product } = require("../../controller/productController");
const { createFlavourForProduct } = require("../../controller/flavourController");
const productRouter = express.Router();

productRouter.post("", createProduct);                 // Create a new product
productRouter.get("", get_all_products);              // Get all products
productRouter.post("/flavour", createFlavourForProduct); // Add a flavor to a product
productRouter.get("/filter",filterProduct);
productRouter.get('/:product_id',get_product);

module.exports = productRouter;
