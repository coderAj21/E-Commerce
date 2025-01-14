let sql=require("../config/database")();




async function get_all_unit_from_database(){
    try{
        let [result]=await sql.query(`select unit_id,value from unit`);
        if (!result.length) {
          return {
            success: false,
            message: "No Unit found..",
            data:[],
          };
        }
        return {
          success: true,
          message: "Unit fetched Successfully..",
          data: result,
        };
    }catch(error){
        return {
          success: false,
          error: error,
        };
    }
}

async function insert_unit_in_database(name){
    try{
        let [result] = await sql.query(
          `insert into unit (value) values(?)`,
          [name]
        );
        return {
            success:true,
            message:"Category created Successfully.."
        }
    }catch(error){
        return {
            success:false,
            message:error.sqlMessage,
        }
    }
}

module.exports={get_all_unit_from_database,insert_unit_in_database}