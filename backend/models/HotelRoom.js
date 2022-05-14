const path = require('path');

const db = require(path.resolve(__dirname, "database", "connection"))

const Booking = require(path.resolve(__dirname, "Booking"))

class HotelRoom {

    constructor(roomID){
        this.roomID = roomID
        this.price = 100;   //TODO
    }


    /*
        Returns all data of this hotel room from Room table.
    */    
    getRoomDetails(){
        return new Promise((resolve, reject)=>{
            db.query("SELECT * FROM room where roomID=?", [this.roomID], (err, results)=>{
                if(err) return reject(err)
                resolve(JSON.parse(JSON.stringify(results))[0])
            });
        })  
    }


    /*
        Returns 1 if room is available, 0 otherwise.
    */
    isAvailable(done){
        return new Promise((resolve, reject)=>{
            db.query("SELECT available FROM room where roomID=?", [this.roomID], (err, results)=>{
                if(err) return reject(err)
                resolve(JSON.parse(JSON.stringify(results))[0])
            });
        })  
    }


    /*
        Updates available to 0 and bookingID in room table.
        This represents room is booked. I.e. it is made to unavailable.
    */
    setUnavailable(bookingID){
        return new Promise((resolve, reject)=>{
            db.query("UPDATE room SET available=?, bookingID=? where roomID=?", [0, bookingID, this.roomID], (err, results)=>{
                if(err) return reject(err)
                resolve(true)
            });
        })  
    }


    /*
        Updates available and bookingID to 0 in room table.
        This represents room is freed. I.e. it is made to available.
    */
    setAvailable(done){
        return new Promise((resolve, reject)=>{
            db.query("UPDATE room SET available=?, bookingID=? available FROM room where roomID=?", [1, bookingID, this.roomID], (err, results)=>{
                if(err) return reject(err)
                resolve(true)
            });
        })  
    }



    /*
        Books this hotel room.
        If room is not available, 0 is returned. (to represent it is booked.)
        Otherwise, it is booked and Booking object is returned.
    */
    book(userID){
        return new Promise(async(resolve, reject)=>{
            try{
                let available = await this.isAvailable()
                if(available){
                    let price = this.price;   //TODO
                    let booking = await Booking.createBooking(userID, price)
                    if(booking){
                        await this.setUnavailable(booking.bookingID)
                        resolve(booking)
                    }else{
                        resolve(0)
                    }
                }else{
                    resolve(0)
                }
            }catch(err){reject(err)}
        })
    }


    /*
        Unbooks the room.
    */
    unbook(done){
        this.setAvailable(done)
    }

}


module.exports = HotelRoom