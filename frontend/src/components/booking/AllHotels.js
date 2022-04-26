import useFetch from "../useFetch";
import { Link } from "react-router-dom";


const AllHotels = () => {

    var {data, isPending, error} = useFetch('http://localhost:3001/book/hotels')

    if(data){
        data.hotels.forEach(hotel => {
            hotel.selectUrl = `/book/hotel/${hotel.hotelID}`
        });
    }

   
    return (
        <>
        <h2>All Hotels</h2>
        {isPending && <p> Loading...</p>}
        {error && <p>ERROR OCCURED!! : {error} </p>}
        {data && 
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Hotel ID</th>
                    <th>Name</th>
                    <th>Street Number</th>
                    <th>Street Name</th>
                    <th>City</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.hotels.map(hotel => (
                        <tr key={hotel.hotelID}>
                        <td> {hotel.hotelID} </td>
                        <td> {hotel.name} </td>
                        <td> {hotel.street_number} </td>
                        <td> {hotel.street_name} </td>
                        <td> {hotel.city} </td>
                        <td><Link to={hotel.selectUrl}>Select Hotel</Link></td>
                    </tr>
                ))}
            </tbody>
        </table>
        }
        </>
    );
}
export default AllHotels;

