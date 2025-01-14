const path = require("path");
const { add_product_image_in_database } = require("../models/ProductLogic");


exports.addImage = async (req, res) => {
  try {
    let { product_id } = req.body;
    for (let obj in req.files) {
      let response = await submit_all_images(product_id, req.files[obj]);
      if (!response.success) {
        return res.status(200).json({
          success: false,
          message: response.message,
        });
      }
    }
    return res.status(200).json({
      success: true,
      message: "Image aa gyi",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error in uploading the Images",
      error: error.message,
    });
  }
};

async function submit_all_images(product_id, image) {
  try {
    if (!image) {
      return {
        success: false,
        message: "File not Found",
      };
    }
    // console.log(image);
    let name = Date.now();
    let type = image.mimetype.split("/")[1];
    // console.log(type);
    let filepath = path.join(
      __dirname,
      "..",
      "assets",
      "product",
      `${name}.${type}`
    );
    image.mv(filepath, (error) => {
      if (error) console.log(error);
    });
    name = name + "." + type;
    let image_response = await add_product_image_in_database(product_id, name);
    return {
      success: true,
      message: image_response.message,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error in uploading the product images to database",
      error: error,
    };
  }
}
