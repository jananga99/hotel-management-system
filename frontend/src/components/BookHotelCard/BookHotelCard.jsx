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
        return(
            
            <section className="mx-auto my-5" style={{maxWidth: '23rem'}}>  
                <div className="card book-hotel-card">
                    <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                        <img src="https://mdbootstrap.com/img/Photos/Horizontal/Food/8-col/img (5).jpg" className="img-fluid" />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title font-weight-bold"><a>{this.props.hotel.name}</a></h5>
                        <p className="mb-2">{this.props.hotel.street_number} - {this.props.hotel.street_name}, {this.props.hotel.city}</p>
                        <p className="mb-1">Room: {this.props.room.roomID}/{this.props.room.name}</p>
                        <div className="row mb-1">
                            <div className='col-6'>
                                <i className="fa fa-users"></i>{this.props.room.num_of_people}
                            </div>
                            <div className='col-6'>  
                                {this.props.room.ac_or_non_ac} 
                            </div>
                        </div>
                        <p>${this.props.room.price}</p>
                        <button id="confirmBooking" className="btn btn-info" style={{display:"none"}} onClick={this.props.bookFunc}>Confirm Booking</button>
                        <p id="alreadyBooked" style={{display:"none"}} >Already Booked</p>    
                        <p id="youBooked" style={{display:"none"}} >Booked by You!!!</p>
                    </div>
                </div>
            </section>
                
        );
    }
}

export default BookHotelCard;