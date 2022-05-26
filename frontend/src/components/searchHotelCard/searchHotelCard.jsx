import React from 'react';
import './searchHotelCard.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css'
import { Link } from 'react-router-dom';

class SearchHotelCard extends React.Component {
    
    render() {
        return(
      

        <div className="card search-hotel-card" >
            <img src="https://codingyaar.com/wp-content/uploads/bootstrap-4-card-image-left-demo-image.jpg" className="card-img-top" alt="Hote Picture" />
            <div className='card-body'>
                <h5 className="card-title">{this.props.hotel.name}</h5>
                <p className="card-text"><i className="fa fa-road" aria-hidden="true"></i> {this.props.hotel.street_number}  {this.props.hotel.street_name}</p>
                <p className="card-text"><i className="fa fa-building" aria-hidden="true"></i> {this.props.hotel.city} </p>
                <Link className='btn btn-primary' to={this.props.hotel.selectUrl}>Select Hotel</Link>
            </div>
        </div>





      
        );
    }
}

export default SearchHotelCard;