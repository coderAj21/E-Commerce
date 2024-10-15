let sql=require("../config/database")();

async function create_user_in_database(firstname,lastname,email,password){
    try{
        await sql.query(
        `insert into user (first_name,last_name,email,password) 
            values
            (?,?,?,?);
            `
        ,[firstname,lastname,email,password]);
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
async function reset_password_of_the_user_in_database(email,password){
    try{
        let [result]=await sql.query(
            `update user set password=? where email=?`
        ,[password,email]);
        return {
            success:true
        }
    }catch(error){
        return{
            success:false,
        }
    }
}



module.exports={create_user_in_database,find_user_from_database,reset_password_of_the_user_in_database};