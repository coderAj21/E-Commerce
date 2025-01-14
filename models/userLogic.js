let sql = require("../config/database")();


async function create_address_in_the_database(user_id, address_type, landmark, country, city, pincode, phone_number, address_line){
    try{
        let [result]=await sql.query(
            `insert into address (user_id,address_type,landmark,country,city,pincode,phone_number,address_line)
            values(?,?,?,?,?,?,?,?)`
            , [user_id, address_type, landmark, country, city, pincode, phone_number, address_line]);
        return{
            success:true,
            message:"Address Created Successfully"
        }
    }catch(error){
        return{
            success:false,
            message:error.message
        }
    }
}


module.exports={create_address_in_the_database};