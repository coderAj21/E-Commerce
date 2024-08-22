let sql=require("../config/database")();

async function create_user_in_database(firstname,lastname,email,password,phone_number){
    try{
        console.log(firstname,lastname,email,password,phone_number);
        await sql.query(
        `insert into user (first_name,last_name,email,password,phone_number) 
            values
            (?,?,?,?,?);
            `
        ,[firstname,lastname,email,password,phone_number]);
        return{
            success:true,
        }
    }
    catch(error){
        return {
            success:false,
            error:error.sqlMessage
        }

    }
}

async function find_user_from_database(email){
    try{
        let [result]=await sql.query(
            `select email,password from user where email=?`
        ,[email]);
        console.log(result);
        return {
            success:true,
            data:result
        }
    }catch(error){
        return {
            success:false,
            error:error.sqlMessage,
        }
    }
}




module.exports={create_user_in_database,find_user_from_database};