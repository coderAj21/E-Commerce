let sql = require("../config/database")();




async function create_order_in_database(user_id, total_amount, billing_address_id, shipping_address_id) {
    try {
        let [result] = await sql.query(
            `insert into order_details(user_id, total_amount, billing_address_id,shipping_address_id) 
            values(?,?,?,?) `
            , [user_id, total_amount, billing_address_id, shipping_address_id]);
        if (result.insertId) {
            return {
                success: true,
                data: result.insertId,
            }
        }
        return {
            success: false,
        }
    } catch (error) {
        return {
            success: false,
            error: error,
        }
    }
}


async function create_order_items_in_the_database(order_id, product_id, quantity, price, total_price, flavour_id, weight_id) {
    try {
        let [result] = await sql.query(
            `insert into order_items(order_id,product_id,quantity,price,total_price,flavour_id,weight_id)
            values(?,?,?,?,?,?,?)`
            , [order_id, product_id, quantity, price, total_price, flavour_id, weight_id]);

        console.log(result);
        if (result.insertId) {
            return {
                success: true,
                data: result.insertId,
            }
        }
        return {
            success: false,
        }
    } catch (error) {
        return {
            success: false,
            error: error,
        }
    }
}


module.exports = { create_order_in_database, create_order_items_in_the_database };