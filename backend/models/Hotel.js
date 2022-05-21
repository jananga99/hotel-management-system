const path = require('path');
const HotelRoom = require('./HotelRoom');

const db = require(path.resolve(__dirname, "database", "connection"))
const dbHelper = require(path.resolve(__dirname, "database", "helper"))

class Hotel {

    constructor(hotelID){
        this.hotelID = hotelID
    }


    /*
        Returns all hotels according to given parametres in dataObject
        Passed parametres:
            dataObject          object          Contains all data regarding SELECT operation to be carried out.
                |--whereObject has all where statements (e.g. whereObject={city:'Kur'} -->  .... WHERE city='Kur' ....)
                |--like object has the elements for LIKE. (e.g. like={searchBy:'name',search:'Kur'})  --> ....name LIKE '%Kur%'  .......
        Return Values (if there are no errors):
            JS Array of objects containing details of selected hotels.
    */
    static getAllHotels(dataObject){
        let sql = "SELECT * from hotel"
        let where = 0;
        if(dataObject && 'whereObject' in dataObject && Object.entries(dataObject.whereObject).length>0){
            sql = sql + " WHERE " + dbHelper.equalSequenceString(Object.keys(dataObject.whereObject));
            where = 1;
        };
        if(dataObject && 'like' in dataObject && dataObject.like){
            if(where==0)    sql = sql + " WHERE "
            else    sql = sql + " AND "
            sql = sql + dataObject.like.searchBy + ` LIKE '%${dataObject.like.search}%' `;
        }
        let values = null;
        if(where)   values = Object.values(dataObject.whereObject)
        return new Promise((resolve, reject)=>{
            db.query(sql, values, (err, results)=>{
                if(err) return reject(err)
                resolve(JSON.parse(JSON.stringify(results)))
            });
        })
    }


    /*
        Returns all rooms in this hotel (with available field)
        Return Values (if there are no errors):
            JS Array of objects containing details of all selected rooms.
    */
    getAllRoomsOfHotel(){
        return new Promise((resolve, reject)=>{
            db.query("SELECT * FROM room WHERE hotelID=?", [this.hotelID], (err, rooms)=>{
                if(err) return reject(err)
                rooms = JSON.parse(JSON.stringify(rooms))
                let ret = []
                rooms.forEach(async(roomData) => {
                    let room = new HotelRoom(roomData.roomID)
                    try{
                        roomData.available = await room.isAvialable()
                        ret.push(roomData)
                        if(ret.length===rooms.length)  resolve(ret)
                    }catch(err){reject(err)}
                });
            });
        })   
    }

    
    /*
        Returns all data of this hotel from Hotel table.
        Return Values (if there are no errors):
            JS Object containing all details regarding this hotel.
    */
    getHotelDetails(){
        return new Promise((resolve, reject)=>{
            db.query("SELECT * FROM hotel WHERE hotelID=? LIMIT 1", [this.hotelID], (err, results)=>{
                if(err) return reject(err)
                resolve(JSON.parse(JSON.stringify(results))[0])
            });
        })   
    }


    /*
        Returns all cities in Hotel table without duplicates.
        Return Values (if there are no errors):
            JS array containing all city names.
    */
    static getAllCity(){
        return new Promise((resolve, reject)=>{
            db.query("SELECT DISTINCT city FROM hotel",(err, results)=>{
                if(err) return reject(err)
                let cities = []
                JSON.parse(JSON.stringify(results)).forEach(element=>{
                    cities.push(element.city)
                })
                resolve(cities)
            });
        })        
    }


    /*
        Returns all street names in Hotel table without duplicates.
        Return Values (if there are no errors):
            JS array containing all steeet names.
    */
    static getAllStreetName(){
        return new Promise((resolve, reject)=>{
            db.query("SELECT DISTINCT street_name FROM hotel",(err, results)=>{
                if(err) return reject(err)
                let streetNames = []
                JSON.parse(JSON.stringify(results)).forEach(element=>{
                    streetNames.push(element.street_name)
                })
                resolve(streetNames)
            });
        })  
    }

    
    /*
        Returns all street numbers in Hotel table without duplicates.
        Return Values (if there are no errors):
            JS array containing all steeet numbers.
    */
    static getAllStreetNumber(){
        return new Promise((resolve, reject)=>{
            db.query("SELECT DISTINCT street_number FROM hotel",(err, results)=>{
                if(err) return reject(err)
                let streetNumbers = []
                JSON.parse(JSON.stringify(results)).forEach(element=>{
                    streetNumbers.push(element.street_number)
                })
                resolve(streetNumbers)
            });
        })  
    }


}


module.exports = Hotel