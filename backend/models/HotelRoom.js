const { resolve } = require('path');
const path = require('path');

const db = require(path.resolve(__dirname, "database", "connection"))

const Booking = require(path.resolve(__dirname, "Booking"))


/*
    NOTE: In room creating room, after the room is created, 
        create an object for that inserted room and execute below line,
        let new_room = HotelRoom(new room ID)
        room.availableRoomForBooking()
*/


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
            db.query("SELECT * FROM room where roomID=?", [this.roomID], async (err, results)=>{
                if(err) return reject(err)
                if(results.length===0)  return resolve(false)
                let roomData = JSON.parse(JSON.stringify(results))[0] 
                let room = new HotelRoom(roomData.roomID)
                roomData.available = await room.isAvialable()
                resolve(roomData)
            });
        })  
    }


    /*
        Returns true if room available, false otherwise
    */
    isAvialable(){
        return new Promise(async(resolve, reject)=>{
            try{
                let result = await this.getCurrentAvailableBookingID()
                if(result)  resolve(true)
                else    resolve(false)
            }catch(err){reject(err)}
        })
    }

    /*
        Returns the booking ID for this room correspoding to currently available booking.
        Returns false if this room is unavailable. (I.e. there is no booking with available for this roomID)
    */
    getCurrentAvailableBookingID(){
        return new Promise((resolve, reject)=>{
            db.query("SELECT bookingID FROM booking where roomID=? and state=? LIMIT 1", [this.roomID, "available"], (err, results)=>{
                if(err) return reject(err)
                let temp = JSON.parse(JSON.stringify(results))
                if(temp.length>0)   resolve(temp[0])
                else    resolve(false)
            });   
        })
    }


    /*
        Returns the booking ID for this room correspoding to currently ongoing booking.
        Returns false if a booking is not ongoing. 
    */
    getCurrentOngoingBookingID(){
        return new Promise((resolve, reject)=>{
            db.query("SELECT bookingID FROM booking where roomID=? and state=? LIMIT 1", [this.roomID, "ongoing"], (err, results)=>{
                if(err) return reject(err)
                let temp = JSON.parse(JSON.stringify(results))
                if(temp.length>0)   resolve(temp[0])
                else    resolve(false)
            });   
        })
    }


    /*
        Make availables room for booking.
            Creates an available booking for this roomId.
    */
    availableRoomForBooking(){
        return new Promise(async(resolve, reject)=>{
            try{
                await Booking.createBooking(this.roomID)
                resolve(true)
            }catch(err){reject(err)}
        })
    }


    /*
        Make this room is unavailable.
            Cancels the current available booking for this room.
    */
    unavailableRoomForBooking(){
        return new Promise(async (resolve, reject)=>{
            try{
                let booking_id = await this.getCurrentAvailableBookingID()
                let booking = new Booking(booking_id);
                await booking.cancelRoomBooking();
                resolve(true)
            }catch(err){reject(err)}
        })
    }


    /*
        Cancels the current available booking for this room.
    */
    cancelRoomForBooking(){
        return new Promise(async (resolve, reject)=>{
            try{
                await this.unavailableRoomForBooking()
                await this.availableRoomForBooking()
                resolve(true)
            }catch(err){reject(err)}
        })
    }    
    

    /*
        Books this hotel room.
        If room is not available, return false. Otherwise return bookingID.
    */
    book(userID){
        return new Promise((resolve, reject)=>{
            db.query("UPDATE booking SET userID=?,state=? WHERE roomID=? and state=?",[userID, "ongoing", this.roomID, "available"], async(err, result)=>{
                if(err) return reject(err)
                if(result.changedRows){
                    let bookingID = await this.getCurrentOngoingBookingID()
                    resolve(bookingID)
                }  
                else    resolve(false)
            })
        })
    }


}


module.exports = HotelRoom