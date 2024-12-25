let sql=require("../config/database")();



// flabours table
async function create_flavour_in_database(flavour) {
    try{
        let [result]=await sql.query(
            `insert into flavours(value) values(?)`
        ,[flavour]);
        if(result.insertId){
            return {
                succcess:true,
                message:"Flavour Created Successfully.."
            }
        }
        return {
            succcess:false,
            message:"Some problem occured.."
        }
    }catch(error){
        return{
            succcess:false,
            error:error
        }
    }
}
async function get_all_flavour_from_database() {
    try{
        let [result]=await sql.query(
            `select flavour_id,value from flavours`
        );
        if(!result.length){
            return {
                succcess:false,
                message:"No Flavour found.."
            }
        }
        return {
            succcess:true,
            message:"Flavour fetched Successfully..",
            data:result
        }
    }catch(error){
        return{
            succcess:false,
            error:error
        }
    }
}



// Porduct
async function create_product_flavour_in_the_database(product_id,flavour_id) {
    try{
        let [result]=await sql.query(
            `insert into products_flavours(product_id,flavour_id) values(?,?)`
        ,[product_id,flavour_id]);
        if(result.insertId){
            return {
                succcess:true,
                message:"Flavour created in product Successfully..",
            }
        }
        return {
            succcess:false,
            message:"Some problem occured in creating the flavour in the product"
        }
    }catch(error){
        return {
            succcess:false,
            error:error
        }
    } 
}


module.exports = {
  create_flavour_in_database,
  get_all_flavour_from_database,
  create_product_flavour_in_the_database,
};

