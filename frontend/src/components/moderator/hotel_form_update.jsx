import {useState,useEffect} from "react";
import './css/hotelUpdate.css';
import Axios from 'axios';
import Hotel_View from './view_Hotel';
import 'react-toastify/dist/ReactToastify.min.css';
import {ToastContainer,toast} from 'react-toastify'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

function Hotel_updating_form()  {
  const navigate = useNavigate()
    const[name,setName]=useState("");
    const[star_rating,setStar_Rating]=useState("");
    const[facilities,setFacilities]=useState("");
    const [street_number,setStreet_Number]=useState("");
    const[street_name,setStreet_Name]=useState("");
    const[city,setCity]=useState("");
    const{id}=useParams();
    
    const [hoteldetails, setHoteldetails] = useState([]);
    console.log(name);

//     const getHotel_pre_details = async() => {
//       const responce=await Axios.get(http://localhost:3001/hotel_fetch/${id});
//       setHoteldetails(responce.data);
//       console.log(hoteldetails);
//  };

    useEffect(()=>{
      toast.info("If you don't want to update click  ✓ ");
        setTimeout(() =>{},2500);
      Axios.get(`http://localhost:3001/hotel_fetch/${id}`).then(
        (resp) => setHoteldetails(resp.data)
      );
     },[id]);
 
     
    const handleSubmit=e=>{
      e.preventDefault();
      console.log("submited");
    };
    const addHotel=()=>{
      if (!name || !facilities || !street_number || !street_name){
        toast.error("Please Provide Details that You Willing to Update or Press ✓ to Each Field");}
        else{
      Axios.put(`http://localhost:3001/update/${id}`,{
        name:name,
        star_rating:star_rating,
        facilities:facilities,
        street_number:street_number,
        street_name:street_name,
        city:city
      }).then(() =>{
        toast.success("Hotel Updated");
        setTimeout(() =>{navigate("/moderator/view-hotel");},2500);
        
      })}
    };
    return (
      <div>
       
         <ToastContainer position="top-center" />

          {/* <Hotel_View/> */}
          
      <form onSubmit={handleSubmit}>
      {hoteldetails.map((val, key) => {
          return (
       <div>
        <div className="mb-3">
          <label  className="form-label">
            Name
          </label>
          <div className="flex" >
          <input
            type="text"
            // defaultValue={id ? :""}
            onChange={(event) => {setName(event.target.value)}}
            className="form-control"
            id="name"
            aria-describedby="nameHelp"
            defaultValue={val.name}
            
            
          />
          <button 
          class="btn btn btn-lg"
          onClick={() => {setName(val.name)}} style={{color:"lightblue" ,borderRadius: 90 }}>
      <FontAwesomeIcon icon={faCheckCircle} size="2x" style={{color:"green"}} />
    </button>
    </div>
          {/* <div id="emailHelp" class="form-text">
            We'll never share Hotel email with anyone else.
          </div> */}
        </div>
        <div className="mb-3">
          <label  className="form-label">
            Star Rating
          </label>
          <div className="flex" >
          <select onChange={event=>setStar_Rating(event.target.value)} className="form-select" aria-label="Default select example" defaultValue={val.star_rating}>
            <option value='1'>One Star</option>
            <option  value='2'>Two Star</option>
            <option  value='3'>Three Star</option>
            <option  value='4'>Four Star</option>
            <option  value='5'>Five Star</option>
          </select>
          
          <button class="btn btn btn-lg" style={{color:"lightblue" ,borderRadius: 90 }} onClick={() => {setStar_Rating(val.star_rating)}}>
          <FontAwesomeIcon icon={faCheckCircle} size="2x" style={{color:"green"}} />    </button>
    </div>
        </div>
        <div className="mb-3">
          <label className="form-label">
            Mention Facilities
          </label>
          <div className="flex" >

          <input
            type="text"
            defaultValue={val.facilities}
            onChange={(event) => {setFacilities(event.target.value)}}
            className="form-control"
            id="facilities"
            aria-describedby="facilitiesHelp"
          />
               <button 
          class="btn btn btn-lg"
          onClick={() => {setFacilities(val.facilities)}} style={{color:"lightblue" ,borderRadius: 90 }}>
      <FontAwesomeIcon icon={faCheckCircle} size="2x" style={{color:"green"}} />
    </button>
    </div>
        </div>
        <div className="mb-3">

        <label  className="form-label">
            City
          </label>
          <div className="flex" >

          <input
            type="text"
            defaultValue={val.city}
            onChange={(event) => {setCity(event.target.value)}}

            className="form-control"
            id="city"
            aria-describedby="s_number_Help"
          />
        <button 
          class="btn btn btn-lg"
          onClick={() => {setCity(val.city)}} style={{color:"lightblue" ,borderRadius: 90 }}>
      <FontAwesomeIcon icon={faCheckCircle} size="2x" style={{color:"green"}} />
    </button>
    </div>
        </div>
        <div className="mb-3">
          <label  className="form-label">
            Street Number
          </label>
          <div className="flex" >

          <input
            type="text"
            defaultValue={val.street_number}
            onChange={(event) => {setStreet_Number(event.target.value)}}
            

            className="form-control"
            id="s_number"
            aria-describedby="s_number_Help"
          />
        <button 
          class="btn btn btn-lg"
          onClick={() => {setStreet_Number(val.street_number)}} style={{color:"lightblue" ,borderRadius: 90 }}>
      <FontAwesomeIcon icon={faCheckCircle} size="2x" style={{color:"green"}} />
    </button>
        </div>
        </div>
        <div className="mb-3">
          <label  className="form-label">
            Street Name
          </label>
          <div className="flex" >

          <input
            type="text"
            defaultValue={val.street_name}
            onChange={(event) => {setStreet_Name(event.target.value)}}

            className="form-control"
            id="s_name"
            aria-describedby="s_number_Help"
          />
          
          <button 
          class="btn btn btn-lg"
          onClick={() => {setStreet_Name(val.street_name)}} style={{color:"lightblue" ,borderRadius: 90 }}>
      <FontAwesomeIcon icon={faCheckCircle} size="2x" style={{color:"green"}} />
    </button>
    
    </div>
        </div>
        </div>
   )
  })}
        
      </form>
       
      <button 
         onClick={addHotel} type="submit" className="btn btn-primary">
            Update Hotel
        </button>

      </div>
    );
  }


export default  Hotel_updating_form;