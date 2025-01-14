const sendMail=require("../config/mailSender");
const { set_otp_in_database } = require("../models/authLogic");


exports.send_otp_to_mail=async(email)=>{
    try{
        let otp=parseInt(Math.random()*6*100000);
        let title="Email Verification....";
        let body=`<p>Your OTP:- ${otp}</p> 
        <p>This OTP is valid for the next 3 minutes. Please do not share this code with anyone. If you did not initiate this request, please ignore this email or contact our support team immediately.<p/>
        <p>Best regards,</p><br></br>
        <p>Maya Supplements Team</p>`;
        sendMail(email,title,body);
        await set_otp_in_database(email,otp);
        return {
            success:true,
            message:"Otp is Sent..."
        }
    }catch(error){
        return {
            success:false,
            error:error.message,
        }
    }
}