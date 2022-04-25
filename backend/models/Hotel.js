const path = require('path');

const db = require(path.resolve(__dirname, "database", "operations.js"))

class Hotel {

    constructor(hotelID){
        this.hotelID = hotelID
    }

    static getAllHotels(dataObject, done){
        db.selectTuple('hotel', dataObject, done)
    }


    static getAllRoomsOfHotel(done){
        let dataObject = {
            whereObject: {
                hotelID: this.hotelID
            }
        }
        db.selectTuple('room', dataObject, done)
    }

    
    getHotelDetails(done){
        db.selectTuple('hotel', {whereObject:{hotelID:this.hotelID}}, (err, hotels)=>{
            if(err) return done(err)
            if(hotels.length)   done(null, hotels[0])
            else done(null, null)
        })
    }


}


module.exports = Hotel