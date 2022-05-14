const path = require('path');

const db = require(path.resolve(__dirname, "database", "connection.js"))


class Booking{

    constructor(bookingID){
        this.bookingID = bookingID
    }

    
    /*
        Inserts a new booking for userID and returns corresponding booking object.
    */
    static createBooking(userID, price){
        return new Promise((resolve, reject)=>{
            db.query("INSERT INTO booking (userId, price) VALUES (?,?)", [userID, price], (err, result)=>{
                console.log("F")
                if(err) return reject(err)
                if(result.insertId) return resolve(new Booking(result.insertId))
                else    return resolve(null)
            });
        }) 
    }


    /*
        Updates payment_made in booking table.
    */
    pay(){
        return new Promise((resolve, reject)=>{
            db.query("UPDATE booking SET payment_made=? where bookingID=?", [1, this.bookingID], (err, results)=>{
                if(err) return reject(err)
                resolve(true)
            });
        }) 
    }


}



module.exports = Booking
