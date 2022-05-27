import React from 'react';
import './HotelCard.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css'


class HotelCard extends React.Component {
    
    render() {

        const im = "http://localhost:3001/images/upload_images/"+this.props.hotel.img

        return(
      
            
        <div className="card hotel-card" >
            <img src={im} className="card-img-top" alt="Hote Picture" />
            <div className='card-body'>
                <h5 className="card-title">{this.props.hotel.name}</h5>
                <p className="card-text"><i class="fa fa-road" aria-hidden="true"></i> {this.props.hotel.street_number}  {this.props.hotel.street_name}</p>
                <p className="card-text"><i class="fa fa-building" aria-hidden="true"></i> {this.props.hotel.city} </p>
                <p className="card-text"> {this.props.hotel.facilities} </p>
                
            </div>
        </div>

      
        );
    }
}

export default HotelCard;