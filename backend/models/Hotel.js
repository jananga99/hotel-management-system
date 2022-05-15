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
    */
    static getAllHotels(dataObject){
        let sql = "select * from hotel"
        let where = 0;
        if(dataObject && 'whereObject' in dataObject && Object.entries(dataObject.whereObject).length>0){
            sql = sql + " where " + dbHelper.equalSequenceString(Object.keys(dataObject.whereObject));
            where = 1;
        };
        if(dataObject && 'like' in dataObject && dataObject.like){
            if(where==0)    sql = sql + " where "
            else    sql = sql + " and "
            sql = sql + dataObject.like.searchBy + ` like '%${dataObject.like.search}%' `;
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
    */
    getAllRoomsOfHotel(){
        return new Promise((resolve, reject)=>{
            db.query("SELECT * FROM room where hotelID=?", [this.hotelID], (err, rooms)=>{
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
    */
    getHotelDetails(){
        return new Promise((resolve, reject)=>{
            db.query("SELECT * FROM hotel where hotelID=?", [this.hotelID], (err, results)=>{
                if(err) return reject(err)
                resolve(JSON.parse(JSON.stringify(results))[0])
            });
        })   
    }


    /*
        Returns all cities in Hotel table without duplicates.
    */
    static getAllCity(){
        return new Promise((resolve, reject)=>{
            db.query("SELECT city FROM hotel",(err, results)=>{
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
    */
    static getAllStreetName(){
        return new Promise((resolve, reject)=>{
            db.query("SELECT street_name FROM hotel",(err, results)=>{
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
    */
    static getAllStreetNumber(){
        return new Promise((resolve, reject)=>{
            db.query("SELECT street_number FROM hotel",(err, results)=>{
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