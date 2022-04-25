const path = require('path');

const db = require(path.resolve(__dirname, "database", "operations.js"))

const Booking = require(path.resolve(__dirname, "Booking"))

class HotelRoom {

    constructor(roomID){
        this.roomID = roomID
        this.price = 100;   //TODO
    }


    /*
        Returns all data of this hotel room from Room table.
    */    
    getRoomDetails(done){
        db.selectTuple('room', {
            whereObject:{
                roomID:this.roomID
            }
        }, (err, rooms)=>{
            if(err) return done(err)
            if(rooms.length){
                rooms[0].price = this.price
                done(null, rooms[0])
            }   
            else done(null, null)
        })
    }


    /*
        Returns 1 if room is available, 0 otherwise.
    */
    isAvailable(done){
        db.selectTuple('room', {
            whereObject: {roomID:this.roomID},
            attributeList: ['available']
        }, (err, result)=>{
            if(err) return done(err)
            done(null, result[0].available)
        })
    }


    /*
        Updates available to 0 and bookingID in room table.
        This represents room is booked. I.e. it is made to unavailable.
    */
    setUnavailable(bookingID, done){
        db.updateTuple('room', {
            whereObject: {roomID: this.roomID},
            valueObject: {
                available: 0,
                bookingID: bookingID
            }
        },done)
    }


    /*
        Updates available and bookingID to 0 in room table.
        This represents room is freed. I.e. it is made to available.
    */
    setAvailable(done){
        db.updateTuple('room', {
            whereObject: {roomID: this.roomID},
            valueObject: {
                available: 1,
                bookingID: 0
            }
        },done)
    }



    /*
        Books this hotel room.
        If room is not available, 0 is returned. (to represent it is booked.)
        Otherwise, it is booked and Booking object is returned.
    */
    book(userID, done){
        this.isAvailable((err, available)=>{
            if(err) return done(err)
            if(available){
                let price = this.price;   //TODO
                Booking.createBooking(userID, price, (err, booking)=>{
                    if(err) return done(err)
                    if(booking) {
                        this.setUnavailable(booking.bookingID, (err, result)=>{
                            if(err) return done(err)
                            done(null, booking)
                        })
                    }
                    else    return done(null, 0)
                })
            }else{
                done(null, 0)
            }
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