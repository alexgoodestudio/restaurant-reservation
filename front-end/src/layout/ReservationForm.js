import React, { useState } from "react";

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



  return (
    <div>
      New Reservation
      <form className="mt-5 w-50">
        <input name="first_name"/>
        <input name="last_name"/>
        <input name="mobile_number"/>
        <input type="date" placeholder="YYYY-MM-DD" pattern="\d{4}-\d{2}-\d{2}"/>       
        <input type="time" placeholder="HH:MM" pattern="[0-9]{2}:[0-9]{2}"/>
        <input name="people"/>
      </form>
    </div>
  );
}

export default ReservationForm;
