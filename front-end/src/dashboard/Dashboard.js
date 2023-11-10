import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Reservations from "../components/Reservations";
import Tables from "../components/Tables";
import "./dashboard.css";
import useQuery from "../utils/useQuery";
import { today } from "../utils/date-time";
import image1 from "../images/s2.png"


function Dashboard() {
  const query = useQuery();
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [currentDate, setCurrentDate] = useState(query.get("date") || today());

  const dateObj = new Date(currentDate);
  const dayIndex = dateObj.getDay() + 1;
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = daysOfWeek[dayIndex];

  const handleNextDay = () => {
    const nextDay = new Date(currentDate);
    nextDay.setDate(nextDay.getDate() + 1);
    setCurrentDate(nextDay.toISOString().split("T")[0]);
  };

  const handlePreviousDay = () => {
    const previousDay = new Date(currentDate);
    previousDay.setDate(previousDay.getDate() - 1);
    setCurrentDate(previousDay.toISOString().split("T")[0]);
  };

  const handleToday = () => {
    setCurrentDate(new Date().toISOString().split("T")[0]);
  };

  useEffect(loadDashboard, [currentDate]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    listReservations({ date: currentDate }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables().then(setTables);
    return () => abortController.abort();
  }


  return (
    <div >
      <h1>Reservations.com</h1>
      <img src={image1} className="pic" alt="Descriptive Alt Text" />


          <span className="slide-in bounce h4xl">{" "} on {dayOfWeek}:{" "} <span className="underline"> {currentDate}</span> </span>
      <div className="row contain">
        <div className="col-sm-9  ">

          <div className="display-inline mt-3  slide-in mb-3">
            <button
              className="  mb-3 btn btn-outline-danger width2"
              onClick={handlePreviousDay}
            >
              Previous
            </button>
            <button
              className="  ml-1 mb-3 btn btn-outline-primary width"
              onClick={handleToday}
            >
              Today
            </button>
            <button
              className="  ml-1 mb-3 btn btn-outline-dark width "
              onClick={handleNextDay}
            >
              Next
            </button>
          </div>
    



          <ErrorAlert error={reservationsError} />
          <div className="col-xl-10 col-lg-12 col-md-12 col-sm-12 slide-in ">
            <Reservations
              setError={setReservationsError}
              reservations={reservations}
            />
          </div>
        </div>
        <div className="col-xl-2 col-lg-12 col-md-12 col-sm-12 slide-in d-flex align-items-start tables">
          <Tables tables={tables} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
