const express = require("express");
const { createProduct, addProductImages, get_all_products } = require("../../controller/productController");
const { createFlavourForProduct } = require("../../controller/flavourController");
const productRouter = express.Router();

productRouter.post("", createProduct);                 // Create a new product
productRouter.get("", get_all_products);              // Get all products
// productRouter.get("/:id", getProductByID);             // Get product by ID
productRouter.post("/image", addProductImages);        // Add images to a product
productRouter.post("/flavour", createFlavourForProduct); // Add a flavor to a product

module.exports = productRouter;
