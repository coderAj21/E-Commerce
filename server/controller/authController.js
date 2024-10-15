let bcrypt=require("bcrypt");
let {create_user_in_database, find_user_from_database}=require("../models/authLogic");
let jwt=require("jsonwebtoken");


exports.login=async (req,res)=>{
    try{
        let {email,password}=req.body;
        if (!email || !password ){
            return res.status(200).json({
                success:false,
                message:"All fields required..."
            })
        }
        let user=await find_user_from_database(email);
        if (user.data.length<1){
            return res.status(200).json({
                success:false,
                message:"User doesn't exist"
            })
        }        
        let checkPassword=await bcrypt.compare(password,user.data[0].password);
        if (!checkPassword){
            return res.status(200).json({
                success:false,
                message:"enter the correct password..."
            })
        }
        let token=jwt.sign({email:user.data[0].email},process.env.JWT_SECRET);
        return res.cookie("token",token,{
            httpOnly:true,
        })
        .status(200).json({
            success:true,
            message:"Successfully Login"
        })
    }catch(error){
        return res.status(400).json({
            success:false,
            message:"Error During Login...",
            error:error.message
        })
    }
}

exports.signup=async (req,res)=>{
    try{
        let {firstname,lastname,email,password,confirmPassword}=req.body;
        if (!firstname || !lastname || !email || !password || !confirmPassword){
            return res.status(200).json({
                success:false,
                message:"All fields required...",
            })
        }
        let user=await find_user_from_database(email);
        if (user.data.length>0){
            return res.status(200).json({
                success:false,
                message:"User Already existed..."
            })
        }
        if (password!=confirmPassword){
            return res.status(200).json({
                success:false,
                message:"password did not match..."
            })
        }
        let hashedpass=await bcrypt.hash(password,10);
        let new_user=await create_user_in_database(firstname,lastname,email,hashedpass);
        if (!new_user.success){
            return res.status(200).json({
                success:false,
                message:"Error in signing in...",
                error:new_user.error
            })
        }
        let token=jwt.sign({email:email},process.env.JWT_SECRET);
        return res.cookie("token",token,{
            httpOnly:true,
        })
        .status(200).json({
            success:true,
            message:"Successfully Login"
        })
    }catch(error){
        return res.status(400).json({
            success:false,
            message:"Error in sign in",
            error:error.message
        })

    }
}

exports.forgetPassword=async (req,res)=>{
    try{
        let {email}=req.body;
        if (!email){
            return res.status(200).json({
                success:false,
                message:"Email is required..."
            })
        }
        let find_user=await find_user_from_database(email);
        
        if(find_user.data.length===0){
            return res.status(404).json({
                success:false,
                message:"User not existed...."
            })
        }
        let otp_response=await send_otp(email);
        if (otp_response.success){
            return res.status(201).json({
                success:true,
                message:"OTP sent successfully.."
            })
        }
    }catch(error){
        return res.status(400).json({
            success:false,
            message:"Error during forget password..",
            error:error.message
        })
    }
}

exports.otpVerification=async(req,res)=>{
    try{
        let {email,otp}=req.body;
        if (!email || !otp){
            return res.status(400).json({
                success:false,
                message:"All field required.."
            })
        }
        let result=await verify_user_from_database_with_otp(email,otp);
        if(result.success){
            return res.status(201).json({
                success:true,
                message:"Validation Confirm..."
            })
        }
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error in OTP verification..",
            error:error.message
        })
    }
}

exports.resetPassword=async(req,res)=>{
    try{
        let {email,password,confirmPassword}=req.body;
        if (!email || !password || !confirmPassword){
            return res.status(404).json({
                success:false,
                message:"All field required..."
            })
        }
        if (password!=confirmPassword){
            return res.status(200).json({
                success:false,
                message:"password did not match..."
            })
        }
        let check_user=await find_user_from_database(email);
        if(!check_user.success){
            return res.status(404).json({
                success:false,
                message:"User not existed..."
            })
        }
        if(await bcrypt.compare(password,check_user.data[0].password)){
            return res.status(200).json({
                success:false,
                message:"Please dont use your old password..."
            })
        }
        let hashedpass=bcrypt.hash(password,10);
        let update_user=await reset_password_of_the_user_in_database(email,hashedpass);
        if (!update_user){
            return res.status(404).json({
                success:false,
                message:"some error occured during reseting the password",
            })
        }
        return res.status(200).json({
            success:true,
            message:"Passowrd changed Successfully.."
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error during reseting the password...",
            error:error.message,
        })
    }
}