const mysql = require('mysql');

const con = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    port: 3306
});

con.connect(
    (err)=>{
    if(err) throw err;
});

module.exports = con;