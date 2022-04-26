const path = require('path');

const db = require(path.resolve(__dirname, "database", "operations.js"))

class Hotel {

    constructor(hotelID){
        this.hotelID = hotelID
    }


    /*
        Returns all hotels
    */
    static getAllHotels(dataObject, done){
        db.selectTuple('hotel', dataObject, done)
    }


    /*
        Returns all rooms in this hotel
    */
    getAllRoomsOfHotel(done){
        let dataObject = {
            whereObject: {
                hotelID: this.hotelID
            }
        }
        db.selectTuple('room', dataObject, done)
    }

    
    /*
        Returns all data of this hotel from Hotel table.
    */
    getHotelDetails(done){
        db.selectTuple('hotel', {whereObject:{hotelID:this.hotelID}}, (err, hotels)=>{
            if(err) return done(err)
            if(hotels.length)   done(null, hotels[0])
            else done(null, null)
        })
    }


}


module.exports = Hotel