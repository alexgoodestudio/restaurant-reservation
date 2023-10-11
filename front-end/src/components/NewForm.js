import React from "react";
import ReservationForm from "./ReservationForm";

function NewForm() {
  const title="New Reservation"
  const keyValues = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: Number(""),
  }
    return (
      <>
        <ReservationForm title={title} keyValues={keyValues} />
      </>
    );
  }


export default NewForm;


