import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";


/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <div className="alert alert-danger">
      <ErrorAlert error={reservationsError} />
      </div>



      {reservations.map((reservation, index) => (
        <div key={index} className="bg-light mt-5">
          {/* {JSON.stringify(reservations)} */}
          Name: {reservation.first_name} {reservation.last_name} |
          Reservation ID: {reservation.reservation_id} <br/>
          <button className="btn btn-primary m-2">Submit</button>
          <button className="btn btn-secondary m-2">Booked</button>
          <button className="btn btn-secondary m-2">Seat</button>
          <button className="btn btn-secondary m-2">Edit</button>
        </div>
      ))}

 
    </main>
  );
}

export default Dashboard;
