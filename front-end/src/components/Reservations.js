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

  const rows = reservations.length ? (
    <table className="table">
      <thead>
        <tr>
          <th>Reservation ID</th>
          <th>Name</th>
          <th>Mobile Number</th>
          <th>Date</th>
          <th>Time</th>
          <th>People</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {reservations.filter(reservation => reservation.status !== "cancelled").map((reservation) => (
          <tr key={reservation.reservation_id}>
            <td>{reservation.reservation_id}</td>
            <td>{reservation.first_name}, {reservation.last_name}</td>
            <td>{reservation.mobile_number}</td>
            <td>{reservation.reservation_date}</td>
            <td>{reservation.reservation_time}</td>
            <td>{reservation.people}</td>
            <td data-reservation-id-status={reservation.reservation_id}>{reservation.status}</td>
            <td>
              {reservation.status === "booked" && (
                <>
                  <Link className="btn btn-outline-primary m-1" to={`/reservations/${reservation.reservation_id}/seat`}>Seat</Link>
                  <Link className="btn btn-outline-secondary m-1" to={{
                    pathname: `/reservations/${reservation.reservation_id}/edit`,
                    state: reservation
                  }}>Edit</Link>
                  <button className="btn btn-outline-danger m-1" data-reservation-id-cancel={reservation.reservation_id} onClick={() => onCancel(reservation.reservation_id)}>Cancel</button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div>No reservations found</div>
  );

  return (
    <div className="table">
      {rows}
    </div>
  );
}

export default Reservations;
