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
        Returns all data of this hotel room from Hotel room table.
        Return Values (if there are no errors):
            JS Object containing all details regarding this room.
    */   
    getRoomDetails(){
        return new Promise((resolve, reject)=>{
            db.query("SELECT * FROM room WHERE roomID=? LIMIT 1", [this.roomID], async (err, results)=>{
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
        Returns true if this room available, false otherwise.
        Gets current available Booking Id for ths room. If there is room is available. Otherwise not.
        Return Values (if there are no errors):
            true        boolean         If room is available
            false       boolean         If room is unavailable
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
        Return Values (if there are no errors):
            bookingID   int             If room is available
            false       boolean         If room is unavailable
    */
    getCurrentAvailableBookingID(){
        return new Promise((resolve, reject)=>{
            db.query("SELECT bookingID FROM booking WHERE roomID=? AND state=? LIMIT 1", [this.roomID, "available"], (err, results)=>{
                if(err) return reject(err)
                let temp = JSON.parse(JSON.stringify(results))
                if(temp.length>0)   resolve(temp[0])
                else    resolve(false)
            });   
        })
    }


    /*
        Returns the booking ID for this room correspoding to currently ongoing booking.
        Return Values (if there are no errors):
            bookingID   int             If room is Ongoing
            false       boolean         If room is not Ongoing
    */
    getCurrentOngoingBookingID(){
        return new Promise((resolve, reject)=>{
            db.query("SELECT bookingID FROM booking WHERE roomID=? AND state=? LIMIT 1", [this.roomID, "ongoing"], (err, results)=>{
                if(err) return reject(err)
                let temp = JSON.parse(JSON.stringify(results))
                if(temp.length>0)   resolve(temp[0])
                else    resolve(false)
            });   
        })
    }


    /*
        Make availables room for booking.
            Creates an available booking for this roomId using static method of Booking class.
        Return Values (if there are no errors):
            true        boolean
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
        Return Values (if there are no errors):
            true        boolean
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
        Return Values (if there are no errors):
            true        boolean
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
        Return Values (if there are no errors):
            bookingID       int         if this romm is awailabe and just booked
            false           boolean     Romm is booked just before it is requested.
    */
    book(userID){
        return new Promise((resolve, reject)=>{
            db.query("UPDATE booking SET userID=?,state=? WHERE roomID=? AND state=?",[userID, "ongoing", this.roomID, "available"], async(err, result)=>{
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