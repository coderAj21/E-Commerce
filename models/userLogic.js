let sql = require("../config/database")();

async function create_address_in_the_database(
  user_id,
  address_type,
  landmark,
  country,
  city,
  pincode,
  phone_number,
  address_line,
  state,
  name,
  alternatePhone
) {
  try {
    let [result] = await sql.query(
      `insert into address (user_id,address_type,landmark,country,city,pincode,phone_number,address_line,state,name,alternatePhone)
            values(?,?,?,?,?,?,?,?,?,?,?)`,
      [
        user_id,
        address_type,
        landmark,
        country,
        city,
        pincode,
        phone_number,
        address_line,
        state,
        name,
        alternatePhone,
      ]
    );
    return {
      success: true,
      message: "Address Created Successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

async function get_address_from_database(user_id) {
  try {
    let [result] = await sql.query(`select * from address where user_id=? `, [
      user_id,
    ]);
    if (result.length) {
      return {
        success: true,
        data: result,
      };
    }
    return {
      success: false,
      data: [],
    };
  } catch (error) {
    return {
      success: false,
      error: error,
      data: [],
    };
  }
}

async function update_address_in_database(address_id, user_id, updatedFields) {
  try {
    let query = "UPDATE address SET ";
    let values = [];
    let updates = [];

    for (let field in updatedFields) {
      if (updatedFields[field]) {
        // Only update fields that are provided
        updates.push(`${field} = ?`);
        values.push(updatedFields[field]);
      }
    }

    if (updates.length === 0) {
      return {
        success: false,
        message: "No fields provided for update.",
      };
    }

    query += updates.join(", ") + " WHERE address_id = ? AND user_id = ?";
    values.push(address_id, user_id);

    let [result] = await sql.query(query, values);

    if (result.affectedRows > 0) {
      return {
        success: true,
        message: "Address updated successfully.",
      };
    } else {
      return {
        success: false,
        message: "Address not found or no changes made.",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

module.exports = { create_address_in_the_database, get_address_from_database,update_address_in_database };
