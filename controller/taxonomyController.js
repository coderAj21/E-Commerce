const { get_all_brands_from_database } = require("../models/brandLogic");
const { get_category_from_database } = require("../models/categoryLogic");
const { get_all_flavour_from_database } = require("../models/flavourLogic");
const { get_all_nutrition_from_database } = require("../models/nutritionLogic");
const { get_all_unit_from_database } = require("../models/unitLogic");
const { get_all_weight_from_database } = require("../models/weightLogic");

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
        if(flavour_response?.success){
            obj.flavour=flavour_response?.data;
        }
        let weight_response = await get_all_weight_from_database();
        if(weight_response.success){
            obj.weight=weight_response?.data;
        }
        let unit_response = await get_all_unit_from_database();
        if(unit_response.success){
            obj.unit=unit_response?.data;
        }
        let nutrition_response=await get_all_nutrition_from_database();
        if(nutrition_response.success){
            obj.nutrition=nutrition_response.data;
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