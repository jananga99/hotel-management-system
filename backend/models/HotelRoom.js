const path = require('path');

const db = require(path.resolve(__dirname, "database", "operations.js"))

const Booking = require(path.resolve(__dirname, "Booking"))

class HotelRoom {

    constructor(roomID){
        this.roomID = roomID
        this.price = 100;   //TODO
    }


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


    isAvailable(done){
        db.selectTuple('room', {
            whereObject: {roomID:this.roomID},
            attributeList: ['available']
        }, (err, result)=>{
            if(err) return done(err)
            done(null, result[0].available)
        })
    }


    setUnavailable(bookingID, done){
        db.updateTuple('room', {
            whereObject: {roomID: this.roomID},
            valueObject: {
                available: 0,
                bookingID: bookingID
            }
        },done)
    }


    setAvailable(done){
        db.updateTuple('room', {
            whereObject: {roomID: this.roomID},
            valueObject: {
                available: 1,
                bookingID: 0
            }
        },done)
    }



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


    unbook(done){
        this.setAvailable(done)
    }

}


module.exports = HotelRoom