const { insert_nutrition_in_database } = require("../models/nutritionLogic");


exports.createNutrition = async (req, res) => {
  try {
    let { title } = req.body;
    if (!title) {
      return res.status(200).json({
        success: false,
        message: "All field required..",
      });
    }
    let result = await insert_nutrition_in_database(title);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Nutrition Value Created Successfully...",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error in creating the Nutrition Values",
      error: error.message,
    });
  }
};
