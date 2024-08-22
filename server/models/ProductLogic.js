let sql=require("../config/database")();


async function create_product_in_database(product_name,description,category_id){
    try{
        let [result]=await sql.query(
            `insert into products (product_name,description,category_id)
            values (?,?,?)`   
        ,[product_name,description,category_id]);
        return{
            success:true,
            message:"Product is created",
            data:result,
        }
    }catch(error){
        return {
            success:false,
            message:"Error in creating the product",
            error:error.sqlMessage
        }
    }
}
async function create_product_details_in_database(product_id,original_price,final_price,discount,quantity){
    try{
        let [result]=await sql.query(
            ` insert into products_details (product_id,original_price,final_price,discount,quantity)
              values(?,?,?,?,?)  
            `
        ,[product_id,original_price,final_price,discount,quantity]);
        return {
            success:true,
            message:"Product details are inserted successfully",
            data:result,
        }
    }catch(error){
        return {
            success:false,
            message:"Error in creating product_details",
            error:error.sqlMessage
        }
    }

}

async function add_product_image_in_database(product_id,name){
    try{
        let [result]=await sql.query(
            ` insert into products_images (product_id,value)
              values(?,?);
            `
        ,[product_id,name]);
        return {
            success:true,
            message:"product Images Add successfully"
        }
    }catch(error){
        return{
            success:false,
            message:"Error in inserting the product image in database",
            error:error.sqlMessage
        }
    }
}

module.exports= {
    create_product_in_database,
    create_product_details_in_database,
    add_product_image_in_database
};