const { insert_unit_in_database } = require("../models/unitLogic");


exports.createUnit = async (req, res) => {
  try {
    let { title } = req.body;
    if (!title) {
      return res.status(200).json({
        success: false,
        message: "All field required..",
      });
    }
    let result = await insert_unit_in_database(title?.toUpperCase());
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Unit Created Successfully...",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error in creating the Unit",
      error: error.message,
    });
  }
};
