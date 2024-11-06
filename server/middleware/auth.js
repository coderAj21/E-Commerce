let jwt=require("jsonwebtoken");
require("dotenv").config();


exports.auth=async (req,res,next)=>{
    try{
        let token=req.cookies.token;
        if (!token){
            return res.status(404).json({
                success:false,
                message:"Session timeout..."
            })
        }
        let payload=jwt.verify(token,process.env.JWT_SECRET);
        req.body.email=payload.email;
        next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error during auth middleware",
            error:error.message
        })
    }
}