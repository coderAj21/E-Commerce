let sql = require("../config/database")();

async function create_user_in_database(firstname, lastname, email, password) {
  try {
    let [result] = await sql.query(
      `insert into user (first_name,last_name,email,password) 
            values
            (?,?,?,?);
            `,
      [firstname, lastname, email, password]
    );
    if(result.insertId){
        return {
          success: true,
          data:result.insertId,
        };
    }
    return {
        success:false,
    }
  } catch (error) {
    return {
      success: false,
      error: error.sqlMessage,
    };
  }
}

async function find_user_from_database(email, user_id) {
  try {
    let [result] = await sql.query(
      `select email,password,user_id from user where ${
        email ? "email" : "user_id"
      }=?`,
      [email, user_id]
    );
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error: error.sqlMessage,
    };
  }
}
async function reset_password_of_the_user_in_database(email, password) {
  try {
    let [result] = await sql.query(`update user set password=? where email=?`, [
      password,
      email,
    ]);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
    };
  }
}
async function verify_user_from_database_with_otp(email, otp) {
  try {
    let [result] = await sql.query(`select otp from user where email=?`, [
      email,
    ]);
    if (result[0].otp === otp) {
      return {
        success: true,
      };
    }
    return {
      success: false,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}
async function set_otp_in_database(email, otp) {
  try {
    let [result] = await sql.query(`update user set otp=? where email=?;`, [
      otp,
      email,
    ]);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}
async function reset_password_of_the_user_in_database(email, hashedpass) {
  try {
    let [result] = await sql.query(`update user set password=? where email=?`, [
      hashedpass,
      email,
    ]);
    console.log(result);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

module.exports = {
  create_user_in_database,
  find_user_from_database,
  reset_password_of_the_user_in_database,
  set_otp_in_database,
  verify_user_from_database_with_otp,
  reset_password_of_the_user_in_database,
};
