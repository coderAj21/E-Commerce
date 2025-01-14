let sql = require("../config/database")();

async function get_all_nutrition_from_database() {
  try {
    let [result] = await sql.query(`select nutrition_id,value from nutrition`);
    if (!result.length) {
      return {
        success: false,
        message: "Not found..",
        data: result,
      };
    }
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return{
        success:false,
        error:error
    }
  }
}
async function insert_nutrition_in_database(name){
    try{
        let [result] = await sql.query(
          `insert into nutrition (value) values(?)`,
          [name]
        );
        return {
            success:true,
            message:"Nutrition created Successfully.."
        }
    }catch(error){
        return {
            success:false,
            message:error.sqlMessage,
        }
    }
}
module.exports={get_all_nutrition_from_database,insert_nutrition_in_database};
