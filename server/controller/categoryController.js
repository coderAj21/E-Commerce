const { check_category_exist_in_database ,insert_category_in_database }=require ("../models/categoryLogic");
const {get_category_from_database}=require("../models/categoryLogic");



exports.createCategory=async (req,res)=>{
    try{
        let {name}=req.body;
        if (!name){
            return res.status(200).json({
                success:false,
                message:'All field required..'
            })
        }
        name=name.toLowerCase();
        let check=await check_category_exist_in_database(name);
        if(check.success){
            return res.status(200).json({
                success:false,
                message:check.message
            })
        }
        let result=await insert_category_in_database(name);
        if(!result.success){
            return res.status(400).json({
                success:false,
                message:result.message
            })
        }
        return res.status(200).json({
            success:true,
            message:"Category Created Successfully..."
        })
    }catch(error){
        return res.status(400).json({
            success:false,
            message:'Error in creating the categories',
            error:error.message
        })
    }
}

exports.getCategory=async (req,res)=>{
    try{
        let result=await get_category_from_database();
        if(!result.success){
            return res.status(200).json({
                success:false,
                message:result.message,
            })
        }
        return res.status(200).json({
            success:true,
            message:'Successfully Category Fetched..',
            data:result.data,
        })
    }catch(error){
        return res.status(400).json({
            success:false,
            message:"Error in getting the category details...",
            error:result.message
        })
    }

}
