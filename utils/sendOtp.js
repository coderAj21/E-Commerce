const sendMail = require("../config/mailSender");
let sql=require("../config/database")();


async function send_otp(email) {
    try{
        let otp=parseInt(Math.random()*6*100000);
        insert_otp_to_user(otp,email);
        sendMail(email,"OTP Verification",`This is the OTP for the Verification : ${otp}`);
        return {
            success:true,
            message:"OTP send Successfully.."
        }
    }catch(error){
        return {
            success:false,
            message:"Error occured during the otp sending...",
            error:error.message
        }
    }

}

module.exports=send_otp;

async function insert_otp_to_user(otp,email) {
    try{
        await sql.query(
            `update user set otp=? where email=?`
        ,[otp,email]);
        return {
            success:true
        }
    }catch(error){
        return {
            success:false,
        }

    }
}
