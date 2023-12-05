import React from "react";

import { Link } from "react-router-dom";
import "./Layout.css";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  return (
    <nav className=" navbar align-items-start  p-0">
      <div className="container-fluid d-flex  flex-column p-0">
        <Link
          className=" navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
          to="/"
        >
          <div className="sidebar-brand-text textGreen mt-3 borderOne mx-3 ">
            <span>Reservation.com</span>
          </div>
        </Link>
        <hr className=" my-0" />
        <ul className="nav navbar-nav ">
          <li className="nav-item ">
            <Link className=" d-flex nav-link textGreen" to="/dashboard">
              <span className="mt-1 oi oi-dashboard" />
              &nbsp;Dashboard
            </Link>
          </li>
          <li className="nav-item ">
            <Link className="  nav-link textGreen" to="/search">
              <span className="oi oi-magnifying-glass "/>
              &nbsp;Search
            </Link>
          </li>
          <li className="nav-item ">
            <Link className="  nav-link textGreen" to="/reservations/new">
              <span className="oi oi-plus " />
              &nbsp;New Reservation
            </Link>
          </li>
          <li className="nav-item ">
            <Link className="  nav-link textGreen" to="/tables/new">
              <span className="oi oi-layers " />
              &nbsp;New Table
            </Link>
          </li>
        </ul>
        <div className="text-center  d-none d-md-inline">
          <button
            className="btn rounded-circle  border-0"
            id="sidebarToggle"
            type="button"
          />
        </div>
      </div>
    </nav>
  );
}

export default Menu;
