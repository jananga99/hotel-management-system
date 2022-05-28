import useFetch from "../useFetch";
import { useState } from "react";
import EditOverlay from './EditOverlay';

// import EditOverlay from "./EditOverlay";


const AllRooms = () => {

    var {data, isPending, error} = useFetch('http://localhost:3001/api/get-all-rooms')

    let [edit, setEdit] = useState(false);
    let [roomID, setId] = useState(0);

    const handleDelete = async (id) => {
        if(window.confirm("Are you sure you want to delete this room?")){
            let res = await fetch('/api/delete-room/'+id, {
                method: 'DELETE',
                headers: {
                    "Accept":"application/json",
                    "Content-Type": "application/json",
                }
            });

            let result = await res.json();
            if(result && result.success) {
                console.log("Successfully deleted");
            }
        }
    }

    const handleEdit = (id) => {
        setId(id)
        setEdit(true);
    }

    return (
        <>
        <h2>All Rooms</h2>
        {isPending && <p> Loading...</p>}
        {error && <p>ERROR OCCURED!! : {error} </p>}
        {edit && <EditOverlay visibility={true} roomID={roomID} onClick={()=>setEdit(false)}/>}
        {data && 
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Hotel ID</th>
                    <th>Name</th>
                    <th>Number of People</th>
                    <th>Is AC</th>
                    <th>Price</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.result.map(room => (
                        <tr key={room.roomID}>
                        <td> {room.hotelID} </td>
                        <td> {room.name} </td>
                        <td> {room.num_of_people} </td>
                        <td> {room.ac_or_non_ac} </td>
                        <td> {room.price} </td>
                        <td><a href={window.location.href} className="btn btn-danger" 
                        onClick={() =>handleDelete(room.roomID)}
                        >Delete</a></td>
                        <td><button className="btn btn-info"
                         onClick={() => handleEdit(room.roomID)} 
                        >Edit</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
        }
        </>
    );
}
 
export default AllRooms;