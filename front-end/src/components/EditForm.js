import React from "react";
import ReservationForm from "./ReservationForm";
import { useLocation } from 'react-router-dom';

function EditForm() {
  const title = "Edit Reservation";
  const location = useLocation();
  const reservation = location.state;

  console.log("12345",reservation.reservation_time);

  const keyValues = {
    first_name: reservation.first_name,
    last_name: reservation.last_name,
    mobile_number: reservation.mobile_number,
    reservation_date: reservation.reservation_date,
    reservation_time: reservation.reservation_time,
    people: reservation.people,
  };

console.log(typeof keyValues.reservation_date,"DATE",keyValues.reservation_date)
console.log(typeof reservation.reservation_time,reservation.reservation_time,"TIME")
console.log(typeof reservation.people,"PEOPLE")

  return (
<ReservationForm title={title} keyValues={keyValues} isEdit={true} reservationId={reservation.reservation_id} />
  );
}

export default EditForm;
