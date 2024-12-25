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
    if (result.succcess) {
      return res.status(201).json({
        succcess: true,
        message: "Flavour created in Product Successfully..",
      });
    }
    return res.status(200).json({
      succcess: false,
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
    let { flavour } = req.body;
    let result = await create_flavour_in_database(flavour);
    if (!result?.success) {
      return res.status(404).json({
        success: false,
        message: "Some problem occured in creating the flavour..",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Flavour Created Successfully..",
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: "Error in creating the flavour",
      error: error.message,
    });
  }
};

exports.getAllFlavour = async (req, res) => {
  try {
    let result = await get_all_flavour_from_database();
    if (!result.succcess) {
      return res.status(201).json({
        succcess: false,
        message: "No Flavours Found..",
        data: [],
      });
    }
    return res.status(201).json({
      succcess: true,
      message: "All Flavoured Fetched Successfully..",
      data: result.data,
    });
  } catch (error) {
    return res.status(404).json({
      succcess: false,
      message: "Error in Fetching the Flavour..",
      error: error.message,
    });
  }
};
