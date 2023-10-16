import React from "react";
import ReservationForm from "./ReservationForm";
import { useParams } from 'react-router-dom';
import { readReservation } from "../utils/api";
import { useState, useEffect } from "react";
import { formatAsDate, formatAsTime } from "../utils/date-time";

function EditForm() {
  const [reservation, setReservation] = useState({});
  const title = "Edit Reservation";
  const { reservation_id } = useParams();

  useEffect(() => {
    readReservation(reservation_id).then((data) => setReservation({
      ...data,
      reservation_date: formatAsDate(data.reservation_date),
      reservation_time: formatAsTime(data.reservation_time)
    }))
  }, [])

  return (
    <ReservationForm title={title} formData={reservation} setFormData={setReservation} isEdit={true} reservationId={reservation.reservation_id} />
  );
}

export default EditForm;