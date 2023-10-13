import React, { useState } from "react";
import useQuery from "../utils/useQuery";
import { listReservations } from "../utils/api";

function Search() {
  // const query = useQuery();
  //extract mobile number from query
  // const mobile_number = query("mobile_number")
  // console.log("Query", mobile_number)
  //onClick 
  //onSubmit function that calls listReservations to return reservation info

  //state variable to save the returned reservations so we can display 

  const [mobileNumber, setMobileNumber] = useState("");
  const [reservations, setReservations] = useState([])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const abortController = new AbortController
    // make API call
    // to listReservations and then... 
    await listReservations({ mobile_number: mobileNumber }, abortController.signal)
      //we then take the return data which is a list of reservations and set it to the reservation state's value
      .then((data) => setReservations(data))
      console.log("DATA",reservations);
  }
//NOTE*: check with full valid phone number in url with no special characters
  const handleChange = (event) => {
    // save mobileNumber value
    setMobileNumber(event.target.value)
  };
  console.log();

  return (
    <>
      <form onSubmit={handleSubmit} className="m-5 w-50">
        <h4>Find Reservation</h4>
        <input
          onChange={handleChange}
          className="form-control"
          type="text"
          id="search"
          placeholder="Enter a customer's phone number"
          value={mobileNumber}
          name="search"
        />
        <button
          type="submit"
          className="btn btn-primary mt-2"
        >
          Find
        </button>
        <button className="btn btn-secondary mt-2">Cancel</button>
      </form>
      <div>
        {reservations.map((reservation, index) => (
          <div key={index} className="">
            <p>Reservation ID: {reservation.reservation_id}</p>
            <p>Name: {reservation.first_name} {reservation.last_name}</p>
            <p>Mobile Number: {reservation.mobile_number}</p>
            {/* Add more fields as needed */}
          </div>
        ))}
      </div>
    </>
  );
}

export default Search;
