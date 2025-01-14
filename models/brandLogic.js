let sql=require("../config/database")();

async function get_all_brands_from_database() {
    try{
        let [result]=await sql.query('select brand_id,brand_name from brand');
        if(result.length>0){
            return{
                success:true,
                data:result
            }
        }
        return{
            success:false,
            data:result
        }
    }catch(error){
        return{
            success:false,
            error:error,
        }
    }
}
async function insert_brand_in_database(name){
    try{
        let [result] = await sql.query(
          `insert into brand (brand_name) values(?)`,
          [name]
        );
        return {
            success:true,
            message:"Brand created Successfully.."
        }
    }catch(error){
        return {
            success:false,
            message:error.sqlMessage,
        }
    }
}


module.exports = { get_all_brands_from_database,insert_brand_in_database };