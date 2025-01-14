const mysql=require("mysql2");
require("dotenv").config();

function connectDatabase(){
    let pool=mysql.createPool({
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
        database:process.env.DB_DATABASE
    }).promise();
    return pool;
}


module.exports=connectDatabase;