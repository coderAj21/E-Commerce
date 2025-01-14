const { get_all_brands_from_database, insert_brand_in_database } = require("../models/brandLogic");


exports.getAllBrands=async (req,res)=>{
    try{
        let response=await get_all_brands_from_database();
        if (response.success){
            return res.status(201).json({
                success:true,
                message:"Brands Fetched..",
                data:response.data
            })
        }
        return res.status(200).json({
            success:false,
            message:"Brands not found....",
            data:response.data,
        })
    }catch(error){
        return res.status(404).json({
            success:false,
            message:"Error occured while fetching all brands...",
            error:error.message
        })
    }
}


exports.createBrand = async (req, res) => {
  try {
    let { title } = req.body;
    if (!title) {
      return res.status(200).json({
        success: false,
        message: "All field required..",
      });
    }
    let result = await insert_brand_in_database(title);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: result.message,
      });
    }
    return res.status(200).json({
      success: true,
      message: "Brand Created Successfully...",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error in creating the categories",
      error: error.message,
    });
  }
};
