import React from 'react';
import './hotelCard.css';
// import 'bootstrap/dist/css/bootstrap.min.css'

class HotelCard extends React.Component {
    
    render() {
        return(
            <div className='card'>
                <div className="container">
  <section className="mx-auto my-5" style={{maxWidth: '23rem'}}>
      
    <div className="card">
      <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
        <img src="https://mdbootstrap.com/img/Photos/Horizontal/Food/8-col/img (5).jpg" class="img-fluid" />
        <a href="#!">
          <div className="mask" style={{backgroundColor: 'rgba(251, 251, 251, 0.15)'}}></div>
        </a>
      </div>
      <div className="card-body">
        <h5 className="card-title font-weight-bold"><a>La Sirena restaurant</a></h5>
        <ul className="list-unstyled list-inline mb-0">
          <li className="list-inline-item me-0">
            <i className="fas fa-star text-warning fa-xs"> </i>
          </li>
          <li className="list-inline-item me-0">
            <i className="fas fa-star text-warning fa-xs"></i>
          </li>
          <li className="list-inline-item me-0">
            <i className="fas fa-star text-warning fa-xs"></i>
          </li>
          <li className="list-inline-item me-0">
            <i className="fas fa-star text-warning fa-xs"></i>
          </li>
          <li className="list-inline-item">
            <i className="fas fa-star-half-alt text-warning fa-xs"></i>
          </li>
          <li className="list-inline-item">
            <p className="text-muted">4.5 (413)</p>
          </li>
        </ul>
        <p className="mb-2">$ • American, Restaurant</p>
        <p className="card-text">
          Some quick example text to build on the card title and make up the bulk of the
          card's content.
        </p>
        <hr className="my-4" />
        <p className="lead"><strong>Tonight's availability</strong></p>
        <ul className="list-unstyled list-inline d-flex justify-content-between">
          <li className="list-inline-item me-0">
            <div className="chip me-0">5:30PM</div>
          </li>
          <li className="list-inline-item me-0">
            <div className="chip bg-secondary text-white me-0">7:30PM</div>
          </li>
          <li className="list-inline-item me-0">
            <div className="chip me-0">8:00PM</div>
          </li>
          <li className="list-inline-item me-0">
            <div className="chip me-0">9:00PM</div>
          </li>
        </ul>
        <a href="#!" className="btn btn-link link-secondary p-md-1 mb-0">Button</a>
      </div>
    </div>
    
  </section>
</div>
            </div>
        );
    }
}

export default HotelCard;