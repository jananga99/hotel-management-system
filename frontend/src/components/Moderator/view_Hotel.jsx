import { useEffect, useState } from "react";
import Axios from "axios";
import Side_Bar from "./sideBar";
import "./css/hotelview.css";
import { Link } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.min.css';
import axios from "axios";
import {ToastContainer,toast} from 'react-toastify'
function Hotel_View() {
  const [hotelList, setHotelList] = useState([]);
  const getHotel_details = async() => {
    const responce=await  Axios.get("http://localhost:3001/hotels");
    setHotelList(responce.data);
    
  };
  // useEffect(()=>{
  //   getHotel_details();
  // },[]);

  // name, star_rating, facilities, street_number, street_name
  // <h2>{val.name}</h2>
  // <h2>{val.star_rating}</h2>
  // <h2>{val.facilities}</h2>
  // <h2>{val.street_number}</h2>
  // <h2>{val.street_name}</h2>
  const styles = {
    borderRadius: 30,
    fontWeight: "bold",
  };
  const deleteHotel = (id) => {
    console.log(id);
    if(window.confirm("Are you want to delete this hotel?")){
      Axios.delete(`http://localhost:3001/remove/${id}`);
      toast.success("Hotel Deleted");
     }
  };
  return (
    <div>
      <Side_Bar callGetHotel={() => getHotel_details()} />
      {hotelList.map((val, key) => {
        return (
          <div className="card">
            <img
              id="image"
              src={require("./images/112486687.jpg")}
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
            
              <h5 className="card-title" style={{ color: "red" }}>
                {val.name}
                
              </h5>
              <p className="card-text">{val.facilities}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">{val.star_rating}</li>
              <li className="list-group-item">{val.street_number}</li>
              <li className="list-group-item">{val.street_name}</li>
            </ul>
            <div className="card-body">
              <button
              
                onClick={() =>{deleteHotel(val.hotelID)}}
                style={styles}
                className="btn btn-sm m-2 btn-danger" 
              >
                Delete
              </button>
              <Link to={`/add/${val.hotelID}`}>
              <button
                // onClick={}
                style={styles}
                className="btn btn-sm m-2 btn-warning" 
              >
                Update
              </button>
              </Link>
              {/* <a href="#" class="card-link">
                Card link
              </a>
              <a href="#" class="card-link">
                Another link
              </a> */}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Hotel_View;
