let sql=require("../config/database")();


async function check_category_exist_in_database(name){
    try{
        let [result]=await sql.query(
            `select category_name from category where category_name=?;`
        ,[name]);
        if(result.length>0){
            return {
                success:true,
                message:"Category exists.."
            }
        }
        return {
            success:false,
            message:'Category not found....'
        }
    }catch(error){
        return {
            success:false,
            error:error.sqlMessage
        }
    }
}

async function insert_category_in_database(name){
    try{
        await sql.query(
            `insert into category (category_name) values(?)`
        ,[name]);
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
async function get_category_from_database(){
    try{
        let [result]=await sql.query(
            `select category_name,category_id from category`
        )
        if(result.length>0){
            return {
                success:true,
                message:"Category Fetched Successfully..",
                data:result
            }
        }
        return {
            success:false,
            message:"No category Found..."
        }
    }catch(error){
        return{
            success:false,
            message:error.sqlMessage
        }

    }
}

async function get_category_by_name_from_database(name){
    try{
        let [result]=await sql.query(
            `select category_id from category where category_name=?`
        ,[name]);
        return{
            success:true,
            data:result
        }
    }catch(error){
        return{
            success:false,
            message:"Error in getting the category by name",
            error:error.sqlMessage
        }

    }
}



// export{check_category_exist_in_database};
module.exports={
    check_category_exist_in_database,
    insert_category_in_database,
    get_category_by_name_from_database,
    get_category_from_database
};