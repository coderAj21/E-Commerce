const path = require('path');
const {get_category_by_name_from_database}=require("../models/categoryLogic");
const {create_product_in_database, create_product_details_in_database,
      add_product_image_in_database, get_all_products_from_database,get_all_images_from_database,
      add_product_weight_in_database,
      add_product_flavour_in_database
}=require( "../models/ProductLogic");

exports.createProduct=async (req,res)=>{
    try{
        let{product_name,description,category_name}=req.body;
        let {original_price, final_price,discount,quantity,brand,flavour,weight}=req.body;

        if(!product_name || !description || !category_name){
            return res.status(200).json({
                success:false,
                message:"All Fields Required..."
            })
        }
        if(!original_price || !final_price || !discount ||!quantity ||!brand ||!flavour || !weight){
            return res.status(200).json({
                success:false,
                message:"All Fields Required",
            })
        }
        let category_resposnse=await get_category_by_name_from_database(category_name);
        if(!category_resposnse.success){
            return res.status(200).json({
                success:false,
                message:category_resposnse.message,
                error:category_resposnse.error
            })
        }
        if(category_resposnse.success && category_resposnse.data.length<1){
            return res.status(200).json({
                success:false,
                message:"Please create the Category"
            })
        }
        let category_id=category_resposnse.data[0].category_id;
        
        let product_response=await create_product_in_database(product_name,description,category_id,brand);
        let product_id=product_response.data.insertId;
        // add the data in product details
        let product_details_response=await create_product_details_in_database(product_id,original_price,final_price,
                                                                            discount,quantity);
        if (!product_details_response.success){
            return res.status(200).json({
                success:false,
                message:product_details_response.message,
                error:product_details_response.error
            })
        }
        let product_weight_response=await add_product_weight_in_database(product_id,weight);
        if (!product_weight_response.success){
            return res.status(200).json({
                success:false,
                message:product_details_response.message,
                error:product_details_response.error
            })
        }
        let product_flavour_response=await add_product_flavour_in_database(product_id,flavour);
        
        if (!product_flavour_response.success){
            return res.status(200).json({
                success:false,
                message:product_details_response.message,
                error:product_details_response.error
            })
        }
        return res.status(200).json({
            success:true,
            message:"Product created Successfully...",
            data:product_response.data.insertId
        });
    }catch(error){
        res.status(200).json({
            success:false,
            message:"Error in creating the Product...",
            error:error.message
        })
    }
}

exports.addProductImages=async(req,res)=>{
    try{
        let {product_id}=req.body;
        for (let obj in req.files){
            let response=await submit_all_images(product_id,req.files[obj]);
            if (!response.success){
                return res.status(200).json({
                    success:false,
                    message:response.message
                })
            }
        }
        return res.status(200).json({
            success:true,
            message:"Image aa gyi"
        })
    }catch(error){
        return res.status(400).json({
            success:false,
            message:"Error in uploading the Images",
            error:error.message
        })
        
    }
}

exports.get_all_products=async(req,res)=>{
    try{
        let response=await get_all_products_from_database();
        if (response.success){
            for (let val of response.data){
                let image_response=await get_all_images_from_database(val.product_id);
                if(image_response)val.images=image_response.data;
            }
            return res.status(200).json({
                success:true,
                data:response.data,
                message:"Data is successfully Fetched..."
            })
        }
        return res.status(200).json({
            success:false,
            message:"Products not found...",
        })
    }catch(error){
        return res.status(400).json({
            success:false,
            message:"Error occured while getting the products",
            error:error.message
        })
    }
}

async function submit_all_images(product_id,image) {
    try{
        if (!image){
            return {
                success:false,
                message:"File not Found"
            }
        }
        // console.log(image);
        let name=Date.now();
        let type=image.mimetype.split('/')[1];
        // console.log(type);
        let filepath = path.join(__dirname, '..', 'assets', 'product', `${name}.${type}`);
        image.mv(filepath,(error)=>{
            if(error)console.log(error);
        });
        name=name+'.'+type;
        let image_response=await add_product_image_in_database(product_id,name);
        return {
            success:true,
            message:image_response.message
        }    
    }catch(error){
        return {
            success:false,
            message:"Error in uploading the product images to database",
            error:error,
        }
    }
}

