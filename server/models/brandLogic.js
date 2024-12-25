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


module.exports = { get_all_brands_from_database };