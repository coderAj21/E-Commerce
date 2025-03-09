const { find_user_from_database } = require("../models/authLogic");
const {
  create_address_in_the_database,
  get_address_from_database,
  update_address_in_database,
} = require("../models/userLogic");

exports.createAddress = async (req, res) => {
  try {
    let { user_id } = req.params;
    let {
      address_type,
      landmark,
      country,
      city,
      pincode,
      phone_number,
      address_line,
      state,
      name,
      alternatePhone
    } = req.body;
    if (
      !user_id ||
      !address_type ||
      !landmark ||
      !country ||
      !city ||
      !state ||
      !pincode ||
      !phone_number ||
      !address_line ||
      !name
    ) {
      return res.status(400).json({
        message: "All Field Required...",
        status: false,
      });
    }
    let user = await find_user_from_database(user_id);
    if (!user.success && user.data.length < 1) {
      return res.status(404).json({
        success: false,
        message: "User not existed...",
      });
    }
    let new_address = await create_address_in_the_database(
      user_id,
      address_type,
      landmark,
      country,
      city,
      pincode,
      phone_number,
      address_line,
      state,
      name,
      alternatePhone
    );
    console.log(new_address);
    if (new_address.success) {
      return res.status(201).json({
        success: true,
        message: "Address Created Successfully..",
      });
    }
    return res.status(200).json({
      success: false,
      message: "Address not created ....",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};

exports.getAddressById = async (req, res) => {
  try {
    let { user_id } = req.params;
    if (!user_id) {
      return res.status(200).json({
        success: false,
        message: "User not found..",
        data: [],
      });
    }
    let user = await find_user_from_database(user_id);
    if (!user.success && user.data.length < 1) {
      return res.status(404).json({
        success: false,
        message: "User not existed...",
      });
    }
    let result = await get_address_from_database(user_id);
    if (result?.success) {
      return res.status(200).json({
        success: true,
        message: "Address Fetched Successfully",
        data: result?.data,
      });
    }
    return res.status(404).json({
      success: false,
      message: "Address not found",
      data: [],
    });
  } catch (error) {}
};

exports.updateAddress = async (req, res) => {
  try {
    let { user_id } = req.params;
    let {
      address_id,
      address_type,
      landmark,
      country,
      city,
      pincode,
      phone_number,
      address_line,
      state,
      name,
      alternatePhone,
    } = req.body;

    if (!user_id || !address_id) {
      return res.status(400).json({
        message: "User ID and Address ID are required.",
        status: false,
      });
    }

    let user = await find_user_from_database(user_id);
    if (!user.success && user.data.length < 1) {
      return res.status(404).json({
        success: false,
        message: "User not existed...",
      });
    }

    let updatedAddress = await update_address_in_database(address_id, user_id, {
      address_type,
      landmark,
      country,
      city,
      pincode,
      phone_number,
      address_line,
      state,
      name,
      alternatePhone,
    });


    if (updatedAddress.success) {
      return res.status(200).json({
        success: true,
        message: "Address updated successfully.",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Failed to update address.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
