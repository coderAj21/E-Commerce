let sql = require("../config/database")();


async function create_product_in_database(product_name, description, category_id, brand) {
    try {
        let [result] = await sql.query(
            `insert into products (product_name,description,category_id,brand_name,is_avaialble)
            values (?,?,?,?,?)`
            , [product_name, description, category_id, brand, 1]);
        return {
            success: true,
            message: "Product is created",
            data: result,
        }
    } catch (error) {
        return {
            success: false,
            message: "Error in creating the product",
            error: error
        }
    }
}
async function create_product_details_in_database(product_id, original_price, final_price, discount, quantity) {
    try {
        let [result] = await sql.query(
            ` insert into products_details (product_id,original_price,final_price,discount,quantity)
              values(?,?,?,?,?)  
            `
            , [product_id, original_price, final_price, discount, quantity]);
        return {
            success: true,
            message: "Product details are inserted successfully",
            data: result,
        }
    } catch (error) {
        return {
            success: false,
            message: "Error in creating product_details",
            error: error.sqlMessage
        }
    }

}

async function add_product_image_in_database(product_id, name) {
    try {
        let [result] = await sql.query(
            ` insert into products_images (product_id,value)
              values(?,?);
            `
            , [product_id, name]);
        return {
            success: true,
            message: "product Images Add successfully"
        }
    } catch (error) {
        return {
            success: false,
            message: "Error in inserting the product image in database",
            error: error.sqlMessage
        }
    }
}
async function add_product_flavour_in_database(product_id, flavour) {
    try {
        let [result] = await sql.query(
            `insert into products_flavours(product_id,value)
            values(?,?);`
            , [product_id, flavour]);
        return {
            success: true,
            message: "Product flavour add Successfully..."
        }
    } catch (error) {
        return {
            success: false,
            message: "Error in adding the product flavour..",
            error: error.message
        }
    }
}

async function add_product_weight_in_database(product_id, weight) {
    try {
        let [result] = await sql.query(
            `insert into products_weight(product_id,value)
                values(?,?);
            `
            , [product_id, weight]);
        return {
            success: true,
            message: "Product weight Add Successfully..."
        }
    } catch (error) {
        return {
            success: false,
            message: "Error in adding the product weight...",
            error: error.message
        }
    }

}

async function get_all_products_from_database() {
    try {
        let [result] = await sql.query(
            `select p.product_id,p.product_name,p.description,c.category_name,pd.original_price,pd.final_price,pd.quantity,pd.discount,b.brand_name from products as p
            inner join
            products_details as pd on p.product_id=pd.product_id
            inner join
            category as c on p.category_id=c.category_id
            inner join
            brand as b on p.brand_id=b.brand_id
            order by p.product_id asc;`
        );
        if (result.length > 0) {
            return {
                success: true,
                data: result
            }
        }
        return {
            success: false,
            message: "Data not found..."
        }
    } catch (error) {
        return {
            success: false,
            error: error
        }
    }
}

async function get_all_images_from_database(product_id) {
    try {
        let [result] = await sql.query(
            `select value from products_images where product_id=?;`
            , [product_id]);
        if (result.length > 0) {
            return {
                success: true,
                data: result
            }
        }
        return {
            success: false,
            message: "product images not found..."
        }
    } catch (error) {
        return {
            success: false,
            error: error.sqlMessage
        }
    }
}

module.exports = {
    create_product_in_database,
    create_product_details_in_database,
    add_product_image_in_database,
    get_all_products_from_database,
    get_all_images_from_database,
    add_product_weight_in_database,
    add_product_flavour_in_database
};