const express = require('express'); 
const app = express();
const path = require('path');
const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session); 
const Router = require('./routes/Router');
const bcrypt = require('bcrypt'); 
require('dotenv').config();
const cors=require("cors");
const bodyparser = require("body-parser")

const bookingRouter = require('./routes/bookingRouter');

//parse JSON using express
app.use(express.json())
// app.use(express.urlencoded({extended: false}))
app.use(bodyparser.urlencoded({extended: true}))

// const corsOptions ={
//     origin:'*', 
//     credentials:true,            //access-control-allow-credentials:true
//     optionSuccessStatus:200,
//  }
 app.use(cors()) 

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
});

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "hotel_booking_system"
// });

db.connect(function(err){
    if(err) {
        console.log("DB ERROR");
        throw err;
    }
});

const sessionStore = new MySQLStore({
    expiration : (365 * 60 * 60 * 24 * 1000),
    endConnectionOnClose: false,
}, db);

app.use(session({
    key: 'fsasfsfafawfrhykuytjdafapsovapjv32fq',
    secret: 'abc2idnoin2^*(doaiwu', 
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (365 * 86400 * 1000),
        httpOnly: false,
    }
}));

new Router(app, db);

app.use('/book', bookingRouter);

// app.listen(3001, '192.168.1.101');
app.listen(3001, () => {
    console.log("Server is listening at port 3001");
});

app.get("/api/get-all-customers", (req, res) => {
    const sql = "SELECT * FROM user WHERE type=2;"
    db.query(sql, (err, result) => {
        if (err) {
            console.log("ERROR WHEN FETCHING CUSTOMERS: " + err)
            res.json({
                success: false,
                err
            })
        } else {
            res.json({
                success: true,
                result
            })
        }
    })
})

app.get("/api/get-all-moderators", (req, res) => {
    const sql = "SELECT * FROM user WHERE type=1;"
    db.query(sql, (err, result) => {
        if (err) {
            console.log("ERROR WHEN FETCHING MODERATORS: " + err)
            res.json({
                success: false,
                err
            })
        } else {
            res.json({
                success: true,
                result
            })
        }
    })
})

app.post("/api/create-customer", (req, res) => {
    const {first_name, last_name, email, password, mobile} = req.body
    const hash = bcrypt.hashSync(password, 9)
    const sql = "INSERT INTO user VALUES (DEFAULT, ?, ?, ?, ?, ?, 2, 1);"
    db.query(sql, [first_name, last_name, email, hash, mobile], (err, result) => {
        if (err) {
            console.log("ERROR WHEN ADDING A CUSTOMER: " + err)
        } else {
            if (result.affectedRows === 1) {
                res.json({
                    success: true,
                    result
                })
            } else {
                res.json({
                    success: false,
                    result
                })
            }
        }
    })
})

app.post("/api/create-moderator", (req, res) => {
    const {first_name, last_name, email, password, mobile} = req.body
    const hash = bcrypt.hashSync(password, 9)
    const sql = "INSERT INTO user VALUES (DEFAULT, ?, ?, ?, ?, ?, 1, 1);"
    db.query(sql, [first_name, last_name, email, hash, mobile], (err, result) => {
        if (err) {
            console.log("ERROR WHEN ADDING A MODERATOR: " + err)
            res.json({
                success: false,
                err
            })
        } else {
            res.json({
                success: true,
                result
            })
        }
    })
})

app.get('/api/get-user-by-id/:id', (req, res) => {
    const user_id = req.params.id
    const sql = "SELECT * FROM user WHERE user_id=?"
    db.query(sql, [user_id], (err, result) => {
        if (err) {
            console.log("ERROR WHEN FETCHING A CUSTOMER BY ID: " + err)
            res.json({
                success: false,
                err
            })
        } else {
            res.json({
                success: true,
                result
            })
        }
    })
})

app.put("/api/update-user", (req, res) => {
    const {user_id, first_name, last_name, email, password, mobile, type, status} = req.body
    const sql = "UPDATE user SET first_name=?, last_name=?, email=?, password=?, mobile=?, type=?, status=? WHERE user_id=?";
    const hash = bcrypt.hashSync(password, 9)
    db.query(sql, [first_name, last_name, email, hash, mobile, type, status, user_id], (err, result) => {
        if (err) {
            console.log("ERROR WHEN UPDATING AN USER: " + err)
            res.json({
                success: false,
                err
            })
        } else {
            res.json({
                success: true,
                result
            })
        }
    })
})

app.delete('/api/delete-user/:id', (req, res) => {
    const user_id = req.params.id
    const sql = "DELETE FROM user WHERE user_id=?"
    db.query(sql, [user_id], (err, result) => {
        if (err) {
            console.log("ERROR WHEN DELETING AN USER: " + err)
            res.json({
                success: false,
                err
            })
        } else {
            res.json({
                success: true,
                result
            })
        }
    })
})

app.post('/api/register-customer', (req, res) => {
    const sql = "INSERT INTO user(first_name, last_name, email, password, mobile, type, status) VALUES (?,?,?,?,?,2,1)"
    const hash = bcrypt.hashSync(req.body.password, 9)
    db.query(sql, [req.body.firstname, req.body.lastname, req.body.email, hash, req.body.mobile], (err, result) => {
        if (err) {
            console.log("ERROR WHEN ADDING AN USER(Customer): " + err)
            res.json({
                success: false,
                err
            })
        } else {
            res.json({
                success: true,
                result
            })
        }
    })
})

// error handler
app.use(function(err, req, res, next) {
     //For dev purposes only
        res.end(err.message)
    /*
    res.json({
        success: false,
        msg: 'An error occured, please try again'
    });*/
    return;
});


// let pswrd = bcrypt.hashSync('A123456', 9);
// console.log(bcrypt.compareSync('a123456', pswrd));
// console.log(pswrd);