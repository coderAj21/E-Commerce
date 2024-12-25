let sql = require("../config/database")();



// Weights table
async function create_weight_in_database(weight) {
    try {
        let [result] = await sql.query(
            `insert into weights(value) values(?)`
            , [weight]);
        console.log(result);
        if (result.insertId) {
          return {
            success: true,
            message: "Weight Created Successfully..",
          };
        }
        return {
            success: false,
            message: "Some problem occured.."
        }
    } catch (error) {
        return {
            success: false,
            error: error
        }
    }
}
async function get_all_weight_from_database() {
    try {
        let [result] = await sql.query(
            `select weight_id,value from weights`
        );
        if (!result.length) {
            return {
                success: false,
                message: "No Weight found.."
            }
        }
        return {
            success: true,
            message: "Weight fetched Successfully..",
            data: result
        }
    } catch (error) {
        return {
            success: false,
            error: error
        }
    }
}



// Porduct
async function create_product_weight_in_the_database(product_id, weight_id) {
    try {
        let [result] = await sql.query(
            `insert into products_weight (product_id,weight_id) values(?,?)`
            , [product_id, weight_id]);
        if (result.insertId) {
            return {
                success: true,
                message: "Weight created in product Successfully..",
            }
        }
        return {
            success: false,
            message: "Some problem occured in creating the Weight in the product"
        }
    } catch (error) {
        return {
            success: false,
            error: error
        }
    }
}


module.exports = {
  create_weight_in_database,
  get_all_weight_from_database,
  create_product_weight_in_the_database,
};