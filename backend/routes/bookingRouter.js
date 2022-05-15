var path = require('path')
var express = require('express');
const Booking = require('../models/Booking');
const { json } = require('express');
var router = express.Router();

/* Libs */
const db = require(path.resolve(__dirname, ".." ,"models", "database", "connection"))

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
router.get('/hotels', async (req,res,next)=>{
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
    try{
        let hotels = await Hotel.getAllHotels(dataObject)
        let cities = await Hotel.getAllCity()
        let streetNames = await Hotel.getAllStreetName()
        let streetNumbers = await Hotel.getAllStreetNumber()
            res.json({success: true, hotels, cities, streetNames, streetNumbers})
    }catch(err){next(err)}
});


/* 
    GET hotel details. 
    If there is no hotel for given id, null is sent.
*/
router.get('/hotel/:id', async (req,res,next)=>{
    let hotel = new Hotel(req.params.id)
    try{
        let hotelDetails = await hotel.getHotelDetails();
        let rooms = await hotel.getAllRoomsOfHotel();
        res.json({success: true, hotelDetails, rooms});
    }catch(err){throw err}
})


/* GET Book the room in hotel. */
router.get("/book/:roomId",async (req,res,next)=>{
    let hotelRoom = new HotelRoom(req.params.roomId)
    try{
        let roomDetails = await hotelRoom.getRoomDetails()
        let hotel = new Hotel(roomDetails.hotelID)
        let hotelDetails = await hotel.getHotelDetails()
        res.json({success:true, hotelDetails, roomDetails})
    }catch(err){next(err)}
})


/* POST Book the room in hotel. */
router.post("/book/:id",async(req,res,next)=>{
    let roomID = req.params.id
    let userID = req.session.userID;
    let hotelRoom = new HotelRoom(roomID)
    try{
        let booking = await hotelRoom.book(userID);
        if(booking) res.json({success: true, booking, msg: `Room is booked successfully. Booking Id is ${booking.bookingID}`})
        else    res.json({success: true, msg: "Room is already booked."})        
    }catch(err){next(err)}
})


/* POST unbook the room in hotel. */
router.post("/unbook/:id",async(req,res,next)=>{
    let roomID = req.params.id
    let userID = req.session.userID;
    let hotelRoom = new HotelRoom(roomID)
    try{
        let result = await hotelRoom.cancelRoomForBooking();
        res.json({ success: true, msg: "Room unbooked", result })        
    }catch(err){next(err)}
})


/* GET pay for the booking  */
router.post('/pay/:bookingID', async (req,res,next)=>{
    let booking = new Booking(req.params.bookingID)
    try{
        let result = await booking.pay()
        res.json({success: true, msg: "Paid for the room", result})
    }catch(err){
        next(err)
    }
})






module.exports = router;