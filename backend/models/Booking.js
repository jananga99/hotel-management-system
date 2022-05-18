const path = require('path');

const db = require(path.resolve(__dirname, "database", "connection.js"))


class Booking{

    constructor(bookingID){
        this.bookingID = bookingID
    }

    
    /*
        Inserts a new booking for given roomID and returns corresponding booking object.
        Passed parametres:
            roomID  :   int         roomID to create booking.
        Return Values (if there are no errors):
            Booking Object          if inserting to booking table success.
            null                    if insertion fails.
    */
    static createBooking(roomID){
        return new Promise((resolve, reject)=>{
            db.query("INSERT INTO booking (roomID) VALUES (?)", [roomID], (err, result)=>{
                if(err) return reject(err)
                if(result.insertId) return resolve(new Booking(result.insertId))
                else    return resolve(null)
            });
        }) 
    }


    /*
        Cancel Room Booking corresponding to this booking object. 
        Updates state of booking row for this object's bookingID to 'cancelled'.
        Return values (if there are no errors):
            true        boolean         
    */
    cancelRoomBooking(){
        return new Promise((resolve, reject)=>{
            try{
                db.query("UPDATE booking SET state=? WHERE bookingID=?",["cancelled", this.bookingID], (err, result)=>{
                    if(err) return reject(err)
                    resolve(true)
                })
            }catch(err){reject(err)}
        })
    }


    /*
        Updates payment_made to 1 in corresponding row to this object's bookingID.
        Return values (if there are no errors):
            true        boolean  
    */
    pay(){
        return new Promise((resolve, reject)=>{
            db.query("UPDATE booking SET payment_made=? where bookingID=?", ['1', this.bookingID], (err, results)=>{
                if(err) return reject(err)
                resolve(true)
            });
        }) 
    }


}



module.exports = Booking
