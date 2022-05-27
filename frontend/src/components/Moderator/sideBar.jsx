import React, { Component } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/side_Bar.css";
import Hotel_View from "./view_Hotel";
import Hotel_Adding_form from "./hotel_form";

function Side_Bar(props) {
  
 
    return (
      <div
        id="sidebar-wrapper"
        
      >
        {/* <div className="sidebar-header">User Settings</div> */}
        <ul className="list-unstyled components">
          <li className="navbar-item">
            <Link to="/" className="nav-link" onClick={()=>props.callGetHotel()}>
              View Hotels
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/add" className="nav-link" >
              Add Hotels
            </Link>
          </li>
        </ul>
      </div>
    );
  }


export default Side_Bar;
