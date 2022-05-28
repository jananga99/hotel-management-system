import React from 'react';
import './BookHotelCard.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css'


class BookHotelCard extends React.Component {

    componentDidMount(){
        if(this.props.room.available){
            document.getElementById("confirmBooking").style.display = "block"
            document.getElementById("alreadyBooked").style.display = "none"
        }else{
            document.getElementById("confirmBooking").style.display = "none"
            document.getElementById("alreadyBooked").style.display = "block"
        }        
    }
    


    render() {
        const im = "http://localhost:3001/images/upload_images/"+this.props.hotel.img
        
        const stars = []
        for (let index = 0; index < this.props.hotel.star_rating; index++) {
            stars.push(index)
        }

        return(
            
            <section className="mx-auto my-5" style={{maxWidth: '23rem'}}>  
                <div className="card book-hotel-card">
                    <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                    <img src={im} className="img-fluid" />
                    </div>
                    <div className="card-body">
                        <h3 className="card-title font-weight-bold"><a>{this.props.hotel.name}</a></h3>
                        <p className="mb-2 address">{this.props.hotel.street_number} - {this.props.hotel.street_name}, {this.props.hotel.city}</p>
                        <p className="mb-1 room">Room: {this.props.room.roomID}/{this.props.room.name}</p>
                        <div className="row mb-1">
                            <div className='col-6 people'>
                                <i className="fa fa-users"></i>{this.props.room.num_of_people}
                            </div>
                            <div className='col-6 ac'>  
                                {this.props.room.ac_or_non_ac} 
                            </div>
                        </div>
                        <div className="row mb-1 price">
                            <div className='col-6'>
                                <p>${this.props.room.price}</p>
                            </div>
                            <div className='col-6'>
                            <p className='card-text'>
                                {stars.map(item => {
                                    return <i key={item} className="fa fa-star" aria-hidden="true" style={{color:'orange'}}></i>;
                                })}
                            </p>
                            </div>
                        </div>
                        <div className="row mb-1">
                            <button id="confirmBooking" className="btn btn-info" style={{display:"none"}} onClick={this.props.bookFunc}>Confirm Booking</button>
                        </div>
                        <div className="row mb-1 bookText">
                            <p id="alreadyBooked" style={{display:"none"}} >Already Booked</p>    
                        </div>
                        <div className="row mb-1 bookText">
                            <p id="youBooked" style={{display:"none"}} >Booked by You!!!</p>
                        </div>
                        
                        
                    </div>
                </div>
            </section>
                
        );
    }
}

export default BookHotelCard;