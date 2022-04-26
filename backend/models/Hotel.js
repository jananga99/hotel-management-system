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


    /*
        Returns all cities in Hotel table without duplicates.
    */
    static getAllCity(done){
        db.selectTuple('hotel', {distinct:true, attributeList:['city']}, (err, result)=>{
            if(err) return done(err)
            let cities = []
            result.forEach(element => {
                cities.push(element.city)
            });
            done(null, cities)
        })
    }


    /*
        Returns all street names in Hotel table without duplicates.
    */
    static getAllStreetName(done){
        db.selectTuple('hotel', {distinct:true, attributeList:['street_name']}, (err, result)=>{
            if(err) return done(err)
            let streetNames = []
            result.forEach(element => {
                streetNames.push(element.street_name)
            });
            done(null, streetNames)
        })
    }

    
    /*
        Returns all street numbers in Hotel table without duplicates.
    */
    static getAllStreetNumber(done){
        db.selectTuple('hotel', {distinct:true, attributeList:['street_number']}, (err, result)=>{
            if(err) return done(err)
            let streetNumbers = []
            result.forEach(element => {
                streetNumbers.push(element.street_number)
            });
            done(null, streetNumbers)
        })
    }


}


module.exports = Hotel