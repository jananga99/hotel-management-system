var path = require('path')
var express = require('express');
const Booking = require('../models/Booking');
var router = express.Router();

/* Libs */
const db = require(path.resolve(__dirname, ".." ,"models", "database", "operations.js"))

/* Models */
const Hotel = require(path.resolve(__dirname, "..","models", "Hotel"))
const HotelRoom = require(path.resolve(__dirname, "..","models", "HotelRoom"))


/* GET book */
router.get('/', (req,res,next)=>{
    res.redirect('/book/hotel/all')
})


/* 
    GET Hotel Listing 
    Considers search and filter parametres if given.
    If there are no hotels according to given parametres,
        empty list is sent.   
    Also retuns all cities, street name and street numbers.
        (To use as options in drop down lists in filter section) 
*/
router.get('/hotels', (req,res,next)=>{
    let dataObject = { whereObject: {}}
    if(req.query.name){
        dataObject.like = {
            search : req.query.name,
            searchBy: 'name'
        }
    }
    if(req.query.city)  dataObject.whereObject.city = req.query.city
    if(req.query.street_number)  dataObject.whereObject.street_number = req.query.street_number
    if(req.query.street_name)  dataObject.whereObject.street_name = req.query.street_name
    Hotel.getAllHotels(dataObject, (err, hotels)=>{
        if(err) return next(err)
        Hotel.getAllCity((err, cities)=>{
            if(err) return next(err)
            Hotel.getAllStreetName((err, streetNames)=>{
                if(err) return next(err)
                Hotel.getAllStreetNumber((err, streetNumbers)=>{
                    if(err) return next(err)
                    res.json({
                        success: true,
                        hotels,
                        cities,
                        streetNames,
                        streetNumbers
                    })
                })
            })
        })
    })
});


/* 
    GET hotel details. 
    If there is no hotel for given id, null is sent.
*/
router.get('/hotel/:id', (req,res,next)=>{
    let hotel = new Hotel(req.params.id)
    hotel.getHotelDetails((err, hotelDetails)=>{
        if(err) return next(err)
        hotel.getAllRoomsOfHotel((err, rooms)=>{
            if(err) return next(err)
            res.json({
                success: true,
                hotelDetails,
                rooms
            })
        })
    })
})


/* GET Book the room in hotel. */
router.get("/book/:roomId",(req,res,next)=>{
    let hotelRoom = new HotelRoom(req.params.roomId)
    hotelRoom.getRoomDetails((err, roomDetails)=>{
        if(err) return next(err)
        let hotel = new Hotel(roomDetails.hotelID)
        hotel.getHotelDetails((err, hotelDetails)=>{
            if(err) return next(err)
            res.json({
                success: true,
                hotelDetails,
                roomDetails
            })
        })
    })
})


/* POST Book the room in hotel. */
router.post("/book/:id",(req,res,next)=>{
    let roomID = req.params.id
    let userID = 20;   //TODO
    let hotelRoom = new HotelRoom(roomID)
    hotelRoom.book(userID, (err, booking)=>{
        if(err) return next(err)
        if(booking) res.json({
            success: true,
            booking,
            msg: `Room is booked successfully. Booking Id is ${booking.bookingID}`
        })
        else    res.json({
            success: true,
            msg: "Room is already booked."
        })
    })
})


/* POST unbook the room in hotel. */
router.post("/unbook/:id",(req,res,next)=>{
    let roomID = req.params.id
    let userID = 20;   //TODO
    let hotelRoom = new HotelRoom(roomID)
    hotelRoom.unbook((err, result)=>{
        if(err) return next(err)
        res.json({
            success: true,
            msg: "Room unbooked",
            result
        })
    })
})


/* GET pay for the booking  */
router.post('/pay/:bookingID', (req,res,next)=>{
    let booking = new Booking(req.params.bookingID)
    booking.pay((err, result)=>{
        if(err) return next(err)
        res.json({
            success: true,
            msg: "Paid for the room",
            result
        })
    })
})






module.exports = router;