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
  <div className="contain ">
    <div className="row">
      <div className="col-sm-9 reservations-container d-flex flex-column align-items-start">
        <h1 className="mb-2 slide-in border1 mt-3 mb-3"> Reservations: <span className="slide-in h4xl"> Today: <span className="underline bounce font-italic">{date}</span></span>  </h1>
        <div className="mb-3">
        </div>
        <div className="display-inline text-center mb-4 slide-in "> 
          <button className="mt-2 mb-3 btn btn-outline-danger width2" onClick={handlePreviousDay}>Previous</button>
          <button className="mt-2 mb-3 ml-1 btn btn-outline-primary width" onClick={handleToday}>Today</button>
          <button className="mt-2 mb-3 ml-1 btn btn-outline-dark width " onClick={handleNextDay}>Next</button>
        </div>
        <ErrorAlert error={reservationsError} />
        <div className="col-xl-10 col-lg-12 col-md-12 col-sm-12 slide-in reservations-container">
          <Reservations setError={setReservationsError} reservations={reservations} />
        </div>
      </div>
      <div className="col-xl-2 col-lg-12 col-md-12 col-sm-12 slide-in tables-container d-flex align-items-start">
        <Tables tables={tables} />
      </div>
    </div>
  </div>
);

  
}

export default Dashboard;
