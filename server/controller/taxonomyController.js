const { get_all_brands_from_database } = require("../models/brandLogic");
const { get_category_from_database } = require("../models/categoryLogic");
const { get_all_flavour_from_database } = require("../models/flavourLogic");

exports.taxonomy=async(req,res)=>{
    try{
        let obj={};
        let category_response=await get_category_from_database();
        if (category_response?.success) {
          obj.category = category_response?.data;
        }
        let brand_response=await get_all_brands_from_database();
        if(brand_response?.success){
            obj.brand=brand_response?.data;
        }
        let flavour_response=await get_all_flavour_from_database();
        if(flavour_response?.succcess){
            obj.flavour=flavour_response?.data;
        }
        return res.status(201).json({
            success:true,
            message:"Taxonomy Data Fetched..",
            data:obj,
        })
    }catch(error){
        return res.status(404).json({
            success:false,
            message:"Error in fetching Taxonomy..",
            error:error.message
        })
    }
}