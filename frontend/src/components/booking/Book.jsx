import useFetch from "../useFetch";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookHotelCard from "../BookHotelCard/BookHotelCard";

const Hotel = () => {
    
    const [available, setAvailable] = useState()

    let {roomID} = useParams()
    var {data, isPending, error} = useFetch(`http://localhost:3001/book/book/${roomID}`)
    if(isPending){
        var data = null
    }else{
        if(data){
            data.roomDetails.ac_or_non_ac = data.roomDetails.ac_or_non_ac==="ac" || data.roomDetails.ac_or_non_ac==="AC" ? "AC" : "Non-AC"
            if(data.roomDetails.available !== available) setAvailable(data.roomDetails.available)     
        }
    }

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
        {isPending && <p> Loading...</p>}
        {error && <p>ERROR OCCURED!! : {error} </p>}
        {!isPending && data && 
            <div className='container'>
                <h2>Booking Details</h2>
                <BookHotelCard hotel={data.hotelDetails} room={data.roomDetails} bookFunc={handleConfirmBooking} />  
            </div>
        }
        </>
    );
}
 
export default Hotel;