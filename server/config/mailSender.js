const nodemailer=require("nodemailer");
require("dotenv").config();


const sendMail=async function (email,title,body) {
    try{
        const transporter=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        });
        const info=transporter.sendMail({
            from:"MAYA Supplements ||",
            to:email,
            subject:title,
            html:body
        });
        return info;
    }catch(error){
        return error;
    }
}
module.exports=sendMail;