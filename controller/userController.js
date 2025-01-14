const { find_user_from_database } = require("../models/authLogic");
const {create_address_in_the_database}=require("../models/userLogic");

exports.createAddress = async (req, res) => {
  try {
    let{user_id}=req.params;
    let {
      address_type,
      landmark,
      country,
      city,
      pincode,
      phone_number,
      address_line,
    } = req.body;
    console.log("User ID:", user_id);
    console.log("Address Type:", address_type);
    console.log("Landmark:", landmark);
    console.log("Country:", country);
    console.log("City:", city);
    console.log("Pincode:", pincode);
    console.log("Phone Number:", phone_number);
    console.log("Address Line:", address_line);
    if (
      !user_id ||
      !address_type ||
      !landmark ||
      !country ||
      !city ||
      !pincode ||
      !phone_number ||
      !address_line
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
      address_line
    );
    if(new_address.success){
        return res.status(201).json({
            success:true,
            message:"Address Created Successfully.."
        })
    }
    return res.status(200).json({
        success:false,
        message:"Address not created ...."
    })
  } catch (error) {
    return res.status(500).json({
        success:false,
        message:error.message,
        error:error
    })
  }
};
