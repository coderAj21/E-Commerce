let sql = require("../config/database")();

async function create_product_in_database(
  product_name,
  description,
  category_id,
  brand_id,
  unit_id
) {
  try {
    let [result] = await sql.query(
      `insert into products (product_name,description,category_id,is_avaialble,brand_id,unit_id)
            values (?,?,?,?,?,?)`,
      [product_name, description, category_id, 1, brand_id, unit_id]
    );
    return {
      success: true,
      message: "Product is created",
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      message: "Error in creating the product",
      error: error.sqlMessage,
    };
  }
}

async function add_product_flavour_in_database(product_id, flavours) {
  try {
    const values = flavours.map((flavour_id) => [product_id, flavour_id]);
    const placeholders = values.map(() => `(?, ?)`).join(", ");
    const flatValues = values.flat();

    // Execute the query for bulk insert
    let [result] = await sql.query(
      `INSERT INTO products_flavours (product_id, flavour_id)
       VALUES ${placeholders};`,
      flatValues
    );

    return {
      success: true,
      message: "Product flavours added successfully...",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error in adding the product flavour..",
      error: error.sqlMessage,
    };
  }
}

async function add_product_weight_in_database(product_id, weights) {
  try {
    const values = weights.map((weight) => [
      product_id,
      weight.label,
      weight.original_price,
      weight.final_price,
      weight.discount,
    ]);
    const placeholders = values.map(() => `(?, ?, ?, ?, ?)`).join(", ");
    const flatValues = values.flat();

    let [result] = await sql.query(
      `INSERT INTO products_weight (product_id,label,original_price,final_price,discount)
             VALUES ${placeholders};`,
      flatValues
    );
    return {
      success: true,
      message: "Product weights added successfully...",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error in adding the Product weight...",
      error: error.sqlMessage,
    };
  }
}

async function add_product_nutrition_in_database(product_id, nutritions) {
  try {
    const values = nutritions.map((nutrition) => [
      product_id,
      nutrition.nutrition_id,
      nutrition.label,
      nutrition.value,
      nutrition.unit,
    ]);
    const placeholders = values.map(() => `(?, ?, ?, ?, ?)`).join(", ");
    const flatValues = values.flat();

    let [result] = await sql.query(
      `INSERT INTO product_nutritions (product_id,nutrition_id,label,value,unit_id)
             VALUES ${placeholders};`,
      flatValues
    );
    return {
      success: true,
      message: "Product Nutritions added successfully...",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error in adding the Product Nutrition...",
      error: error.sqlMessage,
    };
  }
}

async function get_all_products_from_database() {
  try {
    let [result] = await sql.query(
      `SELECT 
    p.product_id,
    p.product_name,
    p.description,
    JSON_OBJECT('unit_id', u.unit_id, 'value', u.value) AS unit,
    JSON_OBJECT('brand_id', b.brand_id, 'value', b.brand_name) AS brand,
    JSON_OBJECT('category_id', c.category_id, 'value', c.category_name) AS category,
    JSON_ARRAYAGG(
          JSON_OBJECT('product_flavour_id', pf.product_flavour_id, 'value', f.value)
      ) AS flavours,
    (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'product_weight_id', pw.product_weight_id,
                'label', pw.label,
                'original_price', pw.original_price,
                'final_price', pw.final_price,
                'discount', pw.discount,
                'unit', JSON_OBJECT('unit_id', u.unit_id, 'value', u.value)
            )
        )
        FROM products_weight AS pw
        WHERE pw.product_id = p.product_id
    ) AS weights,
    (
        SELECT JSON_ARRAYAGG(
            JSON_OBJECT(
                'product_nutrition_id', pn.product_nutrition_id,
                'nutrition_id', pn.nutrition_id,
                'label', pn.label,
                'value', pn.value,
                'unit', JSON_OBJECT('unit_id', un.unit_id, 'value', un.value)
            )
        )
        FROM product_nutritions AS pn
        INNER JOIN unit AS un ON pn.unit_id = un.unit_id
        WHERE pn.product_id = p.product_id
    ) AS nutrition_details
FROM 
    products AS p
INNER JOIN
    category AS c ON p.category_id = c.category_id
INNER JOIN
    brand AS b ON p.brand_id = b.brand_id
INNER JOIN 
    products_flavours AS pf ON p.product_id = pf.product_id
INNER JOIN 
    flavours AS f ON pf.flavour_id = f.flavour_id
INNER JOIN 
    unit AS u ON p.unit_id = u.unit_id
GROUP BY 
    p.product_id
limit 10;`
    );
    if (result.length > 0) {
      return {
        success: true,
        data: result,
      };
    }
    return {
      success: false,
      message: "Data not found...",
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
}

async function get_all_images_from_database(product_id) {
  try {
    let [result] = await sql.query(
      `select product_image_id, value from products_images where product_id=?;`,
      [product_id]
    );
    if (result.length > 0) {
      return {
        success: true,
        data: result,
      };
    }
    return {
      success: false,
      message: "product images not found...",
    };
  } catch (error) {
    return {
      success: false,
      error: error.sqlMessage,
    };
  }
}

module.exports = {
  create_product_in_database,
  get_all_products_from_database,
  get_all_images_from_database,
  add_product_weight_in_database,
  add_product_flavour_in_database,
  add_product_nutrition_in_database,
};
