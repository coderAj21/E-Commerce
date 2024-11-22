

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
            message:"Brands not found...."
        })
    }catch(error){
        return res.status(404).json({
            success:false,
            message:"Error occured while fetching all brands...",
            error:error.message
        })
    }
}