const {create_weight_in_database, create_product_weight_in_the_database, get_all_weight_from_database}=require("../models/weightLogic");



// product Weights
exports.createWeightForProduct = async (req, res) => {
  try {
    let { product_id, weight_id } = req.body;
    let result = await create_product_weight_in_the_database(
      product_id,
      weight_id
    );
    if (result.success) {
      return res.status(201).json({
        success: true,
        message: "Weight created in Product Successfully..",
      });
    }
    return res.status(200).json({
      success: false,
      message: "Some problem occured in creating the Weight in the product",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Erorr in creating the Weight in product",
      error: error.message,
    });
  }
};

// Weights
exports.createWeightInDatabase = async (req, res) => {
  try {
    let { weight } = req.body;
    let result = await create_weight_in_database(weight);
    if (!result?.success) {
      return res.status(404).json({
        success: false,
        message: "Some problem occured in creating the Weight..",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Weight Created Successfully..",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: "Error in creating the Weight",
      error: error.message,
    });
  }
};

exports.getAllWeight = async (req, res) => {
  try {
    let result = await get_all_weight_from_database();
    if (!result.success) {
      return res.status(201).json({
        success: false,
        message: "No Weights Found..",
        data: [],
      });
    }
    return res.status(201).json({
      success: true,
      message: "All Weighted Fetched Successfully..",
      data: result.data,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Error in Fetching the Weight..",
      error: error.message,
    });
  }
};
