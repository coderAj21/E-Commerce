const {
  create_flavour_in_database,
  create_product_flavour_in_the_database,
  get_all_flavour_from_database,
} = require("../models/flavourLogic");

// product flavours
exports.createFlavourForProduct = async (req, res) => {
  try {
    let { product_id, flavour_id } = req.body;
    let result = await create_product_flavour_in_the_database(
      product_id,
      flavour_id
    );
    if (result.success) {
      return res.status(201).json({
        success: true,
        message: "Flavour created in Product Successfully..",
      });
    }
    return res.status(200).json({
      success: false,
      message: "Some problem occured in creating the flavour in the product",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Erorr in creating the flavour in product",
      error: error.message,
    });
  }
};

// Flavours
exports.createFlavourInDatabase = async (req, res) => {
  try {
    let { title } = req.body;
    let result=await create_flavour_in_database(title);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message,
      });
    }
    return res.status(201).json({
      success: true,
      message: "Flavour Created Successfully..",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      error: "Error in creating the flavour",
      message: error.message,
    });
  }
};

exports.getAllFlavour = async (req, res) => {
  try {
    let result = await get_all_flavour_from_database();
    if (!result.success) {
      return res.status(201).json({
        success: false,
        message: "No Flavours Found..",
        data: [],
      });
    }
    return res.status(201).json({
      success: true,
      message: "All Flavoured Fetched Successfully..",
      data: result.data,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Error in Fetching the Flavour..",
      error: error.message,
    });
  }
};
