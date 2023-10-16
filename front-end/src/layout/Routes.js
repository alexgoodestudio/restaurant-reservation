import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import Search from "../components/Search";
import NewForm from "../components/NewForm";
import EditForm from "../components/EditForm";
import useQuery from "../utils/useQuery";
import TableForm from "../components/TableForm";
import SeatPage from "../components/SeatPage";

function Routes() {
  const query = useQuery();
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route exact path="/reservations/new">
        <NewForm />
      </Route>
      <Route exact path="/reservations/:reservation_id/edit">
        <EditForm />
      </Route>
      <Route exact path="/search">
        <Search />
      </Route>
      <Route exact path="/tables/new">
        <TableForm />
      </Route>
      <Route exact path="/reservations/:reservation_id/seat">
        <SeatPage />
      </Route>
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
