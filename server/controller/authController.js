let bcrypt=require("bcrypt");
let {create_user_in_database, find_user_from_database}=require("../models/authLogic");


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
        console.log(checkPassword);
        if (!checkPassword){
            return res.status(200).json({
                success:false,
                message:"enter the correct password..."
            })
        }
        res.status(200).json({
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
        let {firstname,lastname,email,password,confirmPassword,phone_number}=req.body;
        if (!firstname || !lastname || !email || !password || !confirmPassword || !phone_number){
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
        let new_user=await create_user_in_database(firstname,lastname,email,hashedpass,phone_number);
        if (!new_user.success){
            return res.status(200).json({
                success:false,
                message:"Error in signing in...",
                error:new_user.error
            })
        }
        return res.status(200).json({
            success:true,
            message:"Successfully signed in..."
        })
    }catch(error){
        return res.status(400).json({
            success:false,
            message:"Error in sign in",
            error:error.message
        })

    }
}