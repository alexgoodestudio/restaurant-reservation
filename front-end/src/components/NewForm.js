import React from "react";
import ReservationForm from "./ReservationForm";
import { useState } from "react";

function NewForm() {
  const keyValues = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };
  const [reservation, setReservation] = useState(keyValues);
  const title = "New Reservation";

  return (
    <ReservationForm title={title} formData={reservation} setFormData={setReservation} isEdit={false} />
  );
}

export default NewForm;
