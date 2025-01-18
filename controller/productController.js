const {
  create_product_in_database,
  get_all_products_from_database,
  get_all_images_from_database,
  add_product_weight_in_database,
  add_product_flavour_in_database,
  add_product_nutrition_in_database,
} = require("../models/ProductLogic");

exports.createProduct = async (req, res) => {
  try {
    let { product_name, description, category_id, unit_id } = req.body;
    let { nutrition, brand_id, flavour, weight } = req.body;

    if (
      !product_name ||
      !description ||
      !category_id ||
      !unit_id ||
      !nutrition ||
      !brand_id ||
      !flavour ||
      !weight
    ) {
      return res.status(200).json({
        success: false,
        message: "All Fields Required...",
      });
    }

    let product_response = await create_product_in_database(
      product_name,
      description,
      category_id,
      brand_id,
      unit_id
    );
    if (!product_response?.success) {
      return res.status(200).json({
        success: false,
        message: product_response.message,
        error: product_response.error,
      });
    }
    let product_id = product_response?.data.insertId;

    let product_weight_response = await add_product_weight_in_database(
      product_id,
      weight
    );
    if (!product_weight_response.success) {
      return res.status(200).json({
        success: false,
        message: product_weight_response.message,
        error: product_weight_response.error,
      });
    }
    let product_flavour_response = await add_product_flavour_in_database(
      product_id,
      flavour
    );
    if (!product_flavour_response.success) {
      return res.status(200).json({
        success: false,
        message: product_flavour_response.message,
        error: product_flavour_response.error,
      });
    }
    let product_nutrition_response = await add_product_nutrition_in_database(product_id, nutrition);
    if(!product_nutrition_response.success){
      return res.status(200).json({
        success: false,
        message: product_nutrition_response.message,
        error: product_nutrition_response.error,
      })
    }

    return res.status(200).json({
      success: true,
      message: "Product created Successfully...",
      data: product_response.data.insertId,
    });
    
  } catch (error) {
    res.status(200).json({
      success: false,
      message: "Error in creating the Product...",
      error: error.message,
    });
  }
};

exports.get_all_products = async (req, res) => {
  try {
    let response = await get_all_products_from_database();
    if (response.success) {
      for (let val of response.data) {
        let image_response = await get_all_images_from_database(val.product_id);
        if (image_response) val.images = image_response.data;
      }
      return res.status(200).json({
        success: true,
        data: response.data,
        message: "Data is successfully Fetched...",
      });
    }
    return res.status(200).json({
      success: false,
      message: "Products not found...",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error occured while getting the products",
      error: error.message,
    });
  }
};
