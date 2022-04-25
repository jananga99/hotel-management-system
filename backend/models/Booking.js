const path = require('path');

const db = require(path.resolve(__dirname, "database", "operations.js"))


class Booking{

    constructor(bookingID){
        this.bookingID = bookingID
    }

    
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


    pay(done){
        db.updateTuple('booking', {
            whereObject: {bookingID:this.bookingID},
            valueObject: {payment_made:1}
        }, done)
    }


}



module.exports = Booking
