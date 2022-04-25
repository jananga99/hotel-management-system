const path = require('path');

const db = require(path.resolve(__dirname, "database", "operations.js"))


class Booking{

    constructor(bookingID){
        this.bookingID = bookingID
    }

    
    /*
        Inserts a new booking for userID and returns corresponding booking object.
    */
    static createBooking(userID, price, done){
        db.insertTuple('booking', {
            userID: userID,
            price: price
        }, (err, result)=>{
            if(err) return done(err)
            if(result.insertId) done(null, new Booking(result.insertId))
            else    done(null, null)
        })
    }


    /*
        Updates payment_made in booking table.
    */
    pay(done){
        db.updateTuple('booking', {
            whereObject: {bookingID:this.bookingID},
            valueObject: {payment_made:1}
        }, done)
    }


}



module.exports = Booking
