const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hotel_booking_system",
    port: 3306
});

con.connect(
    (err)=>{
    if(err) throw err;
});

module.exports = con;