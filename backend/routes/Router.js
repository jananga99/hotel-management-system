const bcrypt = require('bcrypt');

class Router {

    constructor(app, db) {
        this.login(app, db);
        this.logout(app, db);
        this.isLoggedIn(app, db);
    }

    login(app , db) {
        app.post('/login', (req, res) => {
            let email = req.body.email;
            let password = req.body.password;


            email = email.toLowerCase().trim();

            if(email.length > 50 || password.length > 50){
                res.json({
                    success: false,
                    msg: 'An error occured, please try again'
                });
                return;
            }

            let cols = [email];
            db.query("SELECT * FROM user WHERE email = ? LIMIT 1", cols, (err, data, fields) => {

                if(err) {
                    res.json({
                        success: false,
                        msg: "An error occured, please try again",
                    })
                    return;
                }

                //Found a user
                if(data && data.length === 1) {
                    bcrypt.compare(password, data[0].password, (bcryptErr, verified)=>{
                        if(verified) {
                            req.session.userID = data[0].user_id;
                            res.json({
                                success:true,
                                first_name: data[0].first_name,
                                email: data[0].email,
                                type:data[0].type,
                            });
                            return;
                        }else {
                            res.json({
                                success:false,
                                msg : "Invalid password",
                            })
                        }
                    })
                } else {
                    res.json({
                        success:false,
                        msg: "User not found"
                    })
                }
            });
        });
    }

    logout(app, db) {

        app.post('/logout', (req, res)=>{

            if(req.session.userID) {

                req.session.destroy();
                console.log("Session succesfully destroyed");
                res.json({
                    success:true,
                })

                return true;
            } else {
                res.json({
                    success: false,
                })

                return false;
            }
        })
    }

    isLoggedIn(app, db) {

        app.post('/isLoggedIn', (req, res)=>{
            // req.session.destroy();
            if(req.session.userID || req.session.userID == 0) {
                let cols = [req.session.userID];
                db.query('SELECT * FROM user WHERE user_id = ? LIMIT 1',cols, (err, data, fields) => {
                    if(data && data.length === 1) {
                        res.json({
                            success: true,
                            first_name: data[0].first_name,
                            email: data[0].email,
                            type:data[0].type,
                        });

                        return true;
                    }else  {
                        res.json({
                            success: false,
                        });
                    }
                });
            }else {
                res.json({
                    success: false
                })
            }
        });
    }
}

module.exports = Router;