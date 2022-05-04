import React from 'react';
import './HotelCard.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css'


class HotelCard extends React.Component {
    
    render() {
        return(
      
        <div className="card hotel-card" >
            <img src="https://codingyaar.com/wp-content/uploads/bootstrap-4-card-image-left-demo-image.jpg" className="card-img-top" alt="Hote Picture" />
            <div className='card-body'>
                <h5 className="card-title">{this.props.hotel.name}</h5>
                <p className="card-text"><i class="fa fa-road" aria-hidden="true"></i> {this.props.hotel.street_number}  {this.props.hotel.street_name}</p>
                <p className="card-text"><i class="fa fa-building" aria-hidden="true"></i> {this.props.hotel.city} </p>
                <p className="card-text"> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ullam, aliquam amet architecto est aspernatur quisquam rem atque consequatur eius dolores nihil, quis, rerum sit quibusdam commodi. Cumque molestiae atque nemo? </p>
                
            </div>
        </div>

      
        );
    }
}

export default HotelCard;