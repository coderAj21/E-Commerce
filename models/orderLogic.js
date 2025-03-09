let sql = require("../config/database")();

async function create_order_in_database(
  user_id,
  total_amount,
  billing_address_id,
  shipping_address_id
) {
  try {
    let [result] = await sql.query(
      `insert into order_details(user_id, total_amount, billing_address_id,shipping_address_id) 
            values(?,?,?,?) `,
      [user_id, total_amount, billing_address_id, shipping_address_id]
    );
    if (result.insertId) {
      return {
        success: true,
        data: result.insertId,
      };
    }
    return {
      success: false,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
}

async function create_order_items_in_the_database(order_id, order_items) {
  try {
    const values = order_items.map((item) => [
      order_id,
      item?.product_id,
      item?.quantity,
      item?.weight?.final_price,
      item?.quantity * item?.weight?.final_price,
      item.flavour?.product_flavour_id,
      item?.weight?.product_weight_id,
    ]);

    const placeholders = values.map(() => `(?,?,?,?,?,?,?)`).join(", ");
    const flatValues = values.flat();

    let [result] = await sql.query(
      `insert into order_items(order_id,product_id,quantity,price,total_price,flavour_id,weight_id)
            values ${placeholders}`,
      flatValues
    );

    if (result.insertId) {
      return {
        success: true,
        data: result.insertId,
      };
    }
    return {
      success: false,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
}

module.exports = {
  create_order_in_database,
  create_order_items_in_the_database,
};
