import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import Reservations from "../components/Reservations";
import Tables from "../components/Tables";
import "./dashboard.css";
import useQuery from "../utils/useQuery";
import { today } from "../utils/date-time";
import image1 from "../images/1.png";

function Dashboard() {
  const query = useQuery();
  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tables, setTables] = useState([]);
  const [currentDate, setCurrentDate] = useState(query.get("date") || today());

  const dateObj = new Date(currentDate);
  const dayIndex = dateObj.getDay();
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
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
    <div>
      <img src={image1} className="fullScreen " alt="banner" />
     <div className="ml-5">

          <h1 className="mt-3 d-flex ">
            <span className="italics1">Seamless </span> Reservations,
            <span className="italics2"> Exceptional</span> Service.
          </h1>

      <p className="p-0 mt-2 mb-5">
        Designed with the needs of restaurant staff in mind, we equip your team
        with the tools to manage reservations, and table allocations with
        unparalleled ease.
      </p>
      
        <div className=" mt-5">
        <p className=" mr-5">
          {" "}
          Reservations for: {dayOfWeek},{" "}
          <span className="ml-1 underline"> {currentDate}</span>{" "}
        </p>

        <div className="display-inline mb-3  slide-in ">
          <button
            className="   btn btn-outline-danger width2"
            onClick={handlePreviousDay}
          >
            Previous
          </button>
          <button
            className="ml-1  btn btn-outline-primary width"
            onClick={handleToday}
          >
            Today
          </button>
          <button
            className="ml-1  btn btn-outline-dark width"
            onClick={handleNextDay}
          >
            Next
          </button>
        </div>
      </div>
      </div>
      <div className="row contain ">
        <div className="col-sm-12 col-md-12 col-lg-9 col-xl-9 ">
          <div>
            <ErrorAlert error={reservationsError} />
            <div className="table-responsive">
              <Reservations
                setError={setReservationsError}
                reservations={reservations}
              />
            </div>
          </div>
        </div>
        <div className="col-xl-2 col-lg-12 col-md-12 col-sm-12 slide-in ">
          <Tables tables={tables} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
