import useFetch from "../useFetch";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const Hotel = () => {
    
    const [available, setAvailable] = useState()

    let {roomID} = useParams()
    var {data, isPending, error} = useFetch(`http://localhost:3001/book/book/${roomID}`)
    if(data){
        data.roomDetails.ac_or_non_ac = data.roomDetails.ac_or_non_ac==="ac" ? "AC" : "Non-AC"
        if(data.roomDetails.available !== available) setAvailable(data.roomDetails.available)     
    }

    useEffect(()=>{
        if(data){
            if(available){
                document.getElementById("confirmBooking").style.display = "block"
                document.getElementById("alreadyBooked").style.display = "none"
            }else{
                document.getElementById("confirmBooking").style.display = "none"
                document.getElementById("alreadyBooked").style.display = "block"
            } 
        }
    }, [available])

    const handleConfirmBooking = async ()=>{
        let res = await fetch(`/book/book/${roomID}`, {
            method:'POST', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        let result = await res.json();
        if(result && result.success) {
            alert(result.msg)
            document.getElementById("confirmBooking").style.display = "none"
            document.getElementById("alreadyBooked").style.display = "block"
        }else {
            alert("Room booking failed.. Refresh and try again");
        }
    }

    return (
        <>
        <h2>Booking Details</h2>
        {isPending && <p> Loading...</p>}
        {error && <p>ERROR OCCURED!! : {error} </p>}
        {data && 
            <div>
                <div>
                    <h3>Hotel Details</h3>
                    <div className="container" style={{marginLeft:'10px'}}>
                        <div className="row mb-3">
                            <label for="hotelname" className="col-sm-2 col-form-label">Hotel Name</label>
                            <div className="col-sm-10 col-lg-7">
                                <input type="text" className="form-control" readOnly value={data.hotelDetails.name}/>
                            </div>
                        </div>
                    </div>
                    <div className="container" style={{marginLeft:'10px'}}>
                        <div className="row mb-3">
                            <label for="streetNumber" className="col-sm-2 col-form-label">Street Number</label>
                            <div className="col-sm-10 col-lg-7">
                                <input type="text" className="form-control" readOnly value={data.hotelDetails.street_number}/>
                            </div>
                        </div>
                    </div>
                    <div className="container" style={{marginLeft:'10px'}}>
                        <div className="row mb-3">
                            <label for="streetName" className="col-sm-2 col-form-label">Street Name</label>
                            <div className="col-sm-10 col-lg-7">
                                <input type="text" className="form-control" readOnly value={data.hotelDetails.street_name}/>
                            </div>
                        </div>
                    </div>
                    <div className="container" style={{marginLeft:'10px'}}>
                        <div className="row mb-3">
                            <label for="city" className="col-sm-2 col-form-label">City</label>
                            <div className="col-sm-10 col-lg-7">
                                <input type="text" className="form-control" readOnly value={data.hotelDetails.city}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h3>Room Details</h3>
                    <div className="container" style={{marginLeft:'10px'}}>
                        <div className="row mb-3">
                            <label for="roomid" className="col-sm-2 col-form-label">Room ID</label>
                            <div className="col-sm-10 col-lg-7">
                                <input type="text" className="form-control" readOnly value={data.roomDetails.roomID}/>
                            </div>
                        </div>
                    </div>
                    <div className="container" style={{marginLeft:'10px'}}>
                        <div className="row mb-3">
                            <label for="roomname" className="col-sm-2 col-form-label">Room Name</label>
                            <div className="col-sm-10 col-lg-7">
                                <input type="text" className="form-control" readOnly value={data.roomDetails.name}/>
                            </div>
                        </div>
                    </div>
                    <div className="container" style={{marginLeft:'10px'}}>
                        <div className="row mb-3">
                            <label for="numOfPeople" className="col-sm-2 col-form-label">Number of people can stay</label>
                            <div className="col-sm-10 col-lg-7">
                                <input type="text" className="form-control" readOnly value={data.roomDetails.num_of_people}/>
                            </div>
                        </div>
                    </div>
                    <div className="container" style={{marginLeft:'10px'}}>
                        <div className="row mb-3">
                            <label for="acOrNonAc" className="col-sm-2 col-form-label">Ac/Non-AC</label>
                            <div className="col-sm-10 col-lg-7">
                                <input type="text" className="form-control" readOnly value={data.roomDetails.ac_or_non_ac}/>
                            </div>
                        </div>
                    </div>
                    <div className="container" style={{marginLeft:'10px'}}>
                        <div className="row mb-3">
                            <label for="price" className="col-sm-2 col-form-label">Price</label>
                            <div className="col-sm-10 col-lg-7">
                                <input type="text" className="form-control" readOnly value={data.roomDetails.price}/>
                            </div>
                        </div>
                    </div>
                    <button id="confirmBooking" className="btn btn-info" style={{display:"none"}} onClick={handleConfirmBooking}>Confirm Booking</button>
                    <p id="alreadyBooked" style={{display:"none"}} >Already Booked</p>
                </div>
            </div>
        }
        </>
    );
}
 
export default Hotel;