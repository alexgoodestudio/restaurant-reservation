import React, { useEffect, useState } from "react";
import { listReservations,listTables, cancelReservation} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Reservations from "../components/Reservations";
import Tables from "../components/Tables";


/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables()
      .then(setTables)
    return () => abortController.abort();
  }
  function onCancel(reservation_id){
    //come back and write API call to cancel Reservation 
  const abortController = new AbortController()
  cancelReservation(reservation_id, abortController).then(loadDashboard)
  return () => abortController.abort();
  }

  return (
    <main>
      <h1>Dashboard</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Reservations for date</h4>
      </div>
      <ErrorAlert error={reservationsError} className= "d-inline" />
      <Reservations  reservations = {reservations} onCancel={onCancel} className= "d-inline" />
      <Tables  tables = {tables}/>
    </main>
  );
}

export default Dashboard;
