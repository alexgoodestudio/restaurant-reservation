import React from "react";
import { Link, useHistory } from "react-router-dom";
import { cancelReservation } from "../utils/api";

function Reservations({ setError, reservations = [] }) {
  const history = useHistory();

  const onCancel = async (reservation_id) => {
    const abortController = new AbortController();
    const finish = window.confirm(
      "Do you want to cancel this reservation? This cannot be undone."
    );
    if (finish) {
      try {
        setError(null);
        await cancelReservation(reservation_id, abortController.signal);
        history.go(0);
      } catch (error) {
        setError(error);
      }
    }
  };
  //-------------------------------------------------------------------------------------------
  //inside ternary
  const rows = reservations.length ? (
    reservations.map((reservation) => {
      return (

        <div className="form-group row m-3" key={reservation.reservation_id}>
          <div className="col">Reservation ID:{reservation.reservation_id}</div>
          <div className="col">{reservation.first_name}, {reservation.last_name}</div>
          <div className="col">{reservation.mobile_number}</div>
          <div className="col">{reservation.reservation_date}</div>
          <div className="col">{reservation.reservation_time}</div>
          <div className="col">{reservation.people}</div>
          <div className="col" data-reservation-id-status={reservation.reservation_id}>{reservation.status}</div>
          {reservation.status === "booked" ? (
            <div className="">
              <Link className="btn btn-outline-primary m-1" to={`/reservations/${reservation.reservation_id}/seat`} >seat</Link>
              <Link className="btn btn-outline-secondary m-1" to={{
                pathname: `/reservations/${reservation.reservation_id}/edit`,
                state: reservation
              }} >edit</Link>
              <button className="btn btn-outline-danger m-3" data-reservation-id-cancel={reservation.reservation_id} onClick={() => onCancel(reservation.reservation_id)}>cancel</button>
            </div>
          ) : ("")}
        </div>

      );
    })
  ) : (
    <div>No reservations found</div>
  );
  //-------------------------------------------------------------------------------------------


  return (
    <div className="table">
      {rows}
    </div>
  )
}

export default Reservations;