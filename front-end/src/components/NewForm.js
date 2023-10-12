import React from "react";
import ReservationForm from "./ReservationForm";

function NewForm() {
  const title = "New Reservation";
  const keyValues = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: 0,
  };

  return (
    <ReservationForm title={title} keyValues={keyValues} isEdit={false} />
  );
}

export default NewForm;
