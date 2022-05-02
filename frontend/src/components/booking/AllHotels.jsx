import useFetch from "../useFetch";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './AllHotels.css';
import SearchHotelCard from "../searchHotelCard/searchHotelCard";


const AllHotels = () => {

    const [searchName, setSearchName] = useState()
    const [filterCity, setFilterCity] = useState()
    const [filterStreetName, setFilterStreetName] = useState()
    const [filterStreetNumber, setFilterStreetNumber] = useState()
    var {data, isPending, error} = useFetch('http://localhost:3002/book/hotels')
    const [reRender, setreRender] = useState(false)  
    if(data){
        data.hotels.forEach(hotel => {
            hotel.selectUrl = `/book/hotel/${hotel.hotelID}`
        });
    }

    useEffect(()=>{
        setreRender(false)
    }, [reRender])

    const handleSearch = async ()=>{
        let url = "/book/hotels"
        if(searchName || filterCity || filterStreetName || filterStreetNumber){
            url = url + "/?"
        }
        if(searchName)  url = url + `name=${searchName}&`
        if(filterCity && filterCity!=="byCity")  url = url + `city=${filterCity}&`
        if(filterStreetNumber&& filterStreetNumber!=="byStreetNumber")  url = url + `street_number=${filterStreetNumber}&`
        if(filterStreetName&& filterStreetName!=="byStreetName")  url = url + `street_name=${filterStreetName}&`
        let res = await fetch(url, {
            method:'GET', 
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        let result = await res.json();
        if(result && result.success) {
            data.hotels = result.hotels
            setreRender(true)
        }
    }


    return (
        <>
        {isPending && <p> Loading...</p>}
        {error && <p>ERROR OCCURED!! : {error} </p>}
        {data && 
        <div className="container">
            <div className="row">
                <h2>All Hotels</h2>
            </div>
            <div style={{marginLeft:'10px'}}>
                <div className="row mb-3">
                    <div className="col-sm-8 col-lg-3">
                        <label for="filter" className="col-form-label">Filter</label>
                    </div>
                    <div className="col-sm-8 col-lg-3">
                        <select onChange={(e)=>setFilterCity(e.target.value)} >
                            <option value="byCity" selected>By City</option>
                            {data.cities.map(city => (
                                <option value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-sm-8 col-lg-3">
                        <select onChange={(e)=>setFilterStreetName(e.target.value)} >
                            <option value="byStreetName" selected>By Street Name</option>
                            {data.streetNames.map(streetName => (
                                <option value={streetName}>{streetName}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-sm-8 col-lg-3">
                        <select onChange={(e)=>setFilterStreetNumber(e.target.value)} >
                            <option value="byStreetNumber" selected>By Street Number</option>
                            {data.streetNumbers.map(StreetNumber => (
                                <option value={StreetNumber}>{StreetNumber}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <div>
                <div style={{marginLeft:'10px'}}>
                    <div className="row mb-3">
                        <div className="col-sm-10 col-lg-7">
                            <input type="text" className="form-control" placeholer="Search by hotel name" onChange={(e)=>setSearchName(e.target.value)}/>
                        </div>
                        <button id="searchButton" className="col-sm-2 btn btn-info" onClick={handleSearch}>Search</button>
                    </div>
                </div>   
            </div>
            <div>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Hotel ID</th>
                            <th>Name</th>
                            <th>Street Number</th>
                            <th>Street Name</th>
                            <th>City</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.hotels.map(hotel => (
                                <tr key={hotel.hotelID}>
                                <td> {hotel.hotelID} </td>
                                <td> {hotel.name} </td>
                                <td> {hotel.street_number} </td>
                                <td> {hotel.street_name} </td>
                                <td> {hotel.city} </td>
                                <td><Link to={hotel.selectUrl}>Select Hotel</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="row searchCards">
                <div className="col-md-12 col-lg-6" >
                    <SearchHotelCard hotel={data.hotels[0]} />
                </div>
                <div className="col-md-12 col-lg-6">
                    <SearchHotelCard hotel={data.hotels[1]} />
                </div>               
            </div>






        </div>
        }
        </>
    );
}
export default AllHotels;

