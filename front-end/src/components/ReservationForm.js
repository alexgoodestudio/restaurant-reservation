import React, { useState } from "react";
import { createReservation } from "../utils/api";
import {useHistory} from "react-router-dom";

function ReservationForm() {
  const history = useHistory();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });
  
  
  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const abortController = new AbortController()
    createReservation(formData, abortController.signal)
      .then((data) => console.log(data))
      .catch((error) => console.log(error))
      history.push(`/dashboard`)
  }

//The /reservations/new page will display an error message with className="alert alert-danger"

  return (
    <div>
      <form className="m-4 w-50" onSubmit={handleSubmit}>
        <h3>New Reservation</h3>
        <input className="form-control"     type="text"      onChange={handleChange}   id="firstName"     value={formData.first_name}        name="first_name"        placeholder="First Name" />
        <input className="form-control"     type="text"      onChange={handleChange}   id="lastName"      value={formData.last_name}         name="last_name"         placeholder="Last Name" />
        <input className="form-control"     type="text"      onChange={handleChange}   id="mobileNumber"  value={formData.mobile_number}     name="mobile_number"     placeholder="Mobile Number" />
        <input className="form-control"     type="date"      onChange={handleChange}   id="date"          value={formData.reservation_date}  name="reservation_date"  placeholder="YYYY-MM-DD"           pattern="\d{4}-\d{2}-\d{2}" />
        <input className="form-control"     type="time"      onChange={handleChange}   id="time"          value={formData.reservation_time}  name="reservation_time"  placeholder="HH:MM"                pattern="[0-9]{2}:[0-9]{2}" />
        <input className="form-control"     type="number"    onChange={handleChange}   id="capacity"      value={formData.people}            name="people"            placeholder="Number of Guests?"  />
        <button type="submit" className="btn btn-primary mt-2" >Save</button>
        <button className="btn btn-secondary mt-2" >Cancel</button>
      </form>
    </div>
    
  );
}

export default ReservationForm;
