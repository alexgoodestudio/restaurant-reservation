import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Reservations from "../components/Reservations";
import Tables from "../components/Tables";
import './dashboard.css'; 

function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [currentDate, setCurrentDate] = useState(date);

  const handleNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setCurrentDate(nextDay.toISOString().split('T')[0]);
  };

  const handlePreviousDay = () => {
    const previousDay = new Date(currentDate);
    previousDay.setDate(previousDay.getDate() - 1);
    setCurrentDate(previousDay.toISOString().split('T')[0]);
  };

  const handleToday = () => {
    setCurrentDate(new Date().toISOString().split('T')[0]);
  };

  useEffect(loadDashboard, [currentDate]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date: currentDate }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables()
      .then(setTables);
    return () => abortController.abort();
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 reservations-container">
          <h1 className="mb-2">Reservations</h1>
          <div className="mb-3 font-italic">
            <h5>Today:</h5>
          </div>
          <div className="display-inline">
            <button className="mt-2 mb-3 btn btn-outline-danger" onClick={handlePreviousDay}>Previous</button>
            <button className="mt-2 mb-3 ml-1 btn btn-outline-primary" onClick={handleToday}>Today</button>
            <button className="mt-2 mb-3 ml-1 btn btn-outline-dark" onClick={handleNextDay}>Next</button>
          </div>
          <ErrorAlert error={reservationsError} />
          <div className="col-lg-9 col-md-8 col-sm-12 reservations-container">
            <Reservations setError={setReservationsError} reservations={reservations} />
          </div>
        </div>
        <div className="col-lg-3 col-md-4 col-sm-12 tables-container">
          <Tables tables={tables} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
