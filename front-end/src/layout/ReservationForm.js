import React, { useState } from "react";
import { createReservation } from "../utils/api";

function ReservationForm() {
  // Initialize state for form fields
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  });
function handleChange(event){
  setFormData({
    ...formData, 
    [event.target.name]:event.target.value
  })
}
function handleSubmit(event){
  event.preventDefault()
  // alert(JSON.stringify(formData, null, 2))
  const abortController = new AbortController()
  createReservation(formData, abortController.signal)
  .then((data)=> console.log(data))
  .catch((error )=> console.log(error))
}

  return (
    <div>
      <form className="m-4 w-50" onSubmit={handleSubmit}>
        <h3>New Reservation</h3> 
     
        <input className="form-control" type="text" onChange={handleChange}  id="firstName" value={formData.first_name} placeholder="First Name" name="first_name"/>
        <input className="form-control" type="text" onChange={handleChange}  id="lastName" value={formData.last_name} placeholder="Last Name" name="last_name"/>
        <input className="form-control" type="text" onChange={handleChange}  id="mobileNumber" value={formData.mobile_number} placeholder="Mobile Number" name="mobile_number" />
        <input className="form-control" type="date" onChange={handleChange}  id="date" placeholder="YYYY-MM-DD" value={formData.reservation_date} pattern="\d{4}-\d{2}-\d{2}" name="reservation_date"/>       
        <input className="form-control" type="time" onChange={handleChange}  id="time" placeholder="HH:MM" value={formData.reservation_time}pattern="[0-9]{2}:[0-9]{2}" name="reservation_time"/>
        <input className="form-control" type="number" onChange={handleChange}  id="capacity" value={formData.people} placeholder="Number of Guests?" name="people"/>
        <button type="submit" className="btn btn-primary mt-2" >Save</button>
        <button className="btn btn-secondary mt-2" >Cancel</button>
      </form>
    </div>
  );
}

export default ReservationForm;
