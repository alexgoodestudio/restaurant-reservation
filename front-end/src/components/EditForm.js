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
    const fetchData = async () => {
      try {
        const data = await readReservation(reservation_id);
        setReservation({
          ...data,
          reservation_date: formatAsDate(data.reservation_date),
          reservation_time: formatAsTime(data.reservation_time),
        });
      } catch (error) {
        // Handle error as needed, e.g., log it or set an error state
        console.error("An error occurred:", error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <ReservationForm title={title} formData={reservation} setFormData={setReservation} isEdit={true} reservationId={reservation.reservation_id} />
  );
}

export default EditForm;
