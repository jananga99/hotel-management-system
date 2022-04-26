import useFetch from "../useFetch";
import { Link, useParams } from "react-router-dom";


const Hotel = (props) => {
    let {hotelID} = useParams()
    var {data, isPending, error} = useFetch(`http://localhost:3001/book/hotel/${hotelID}`)
    if(data){
        data.rooms.forEach(room => {
            room.bookUrl = `/book/book/${room.roomID}`
            room.available = room.available ? "Yes" : "No"
        });
    }
    return (
        <>
        <h2>Hotel Details</h2>
        {isPending && <p> Loading...</p>}
        {error && <p>ERROR OCCURED!! : {error} </p>}
        {data && 
            <div>
                <div>
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
                    <h3>Rooms Details</h3>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Room ID</th>
                                <th>Name</th>
                                <th>Number of peopls can stay</th>
                                <th>AC/Non-AC</th>
                                <th>Available</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.rooms.map(room => (
                                    <tr key={room.roomID}>
                                    <td> {room.hotelID} </td>
                                    <td> {room.name} </td>
                                    <td> {room.num_of_people} </td>
                                    <td> {room.ac_or_non_ac} </td>
                                    <td> {room.available} </td>
                                    <td><Link to={room.bookUrl}>Book Room</Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        }
        </>
    );
}
 
export default Hotel;