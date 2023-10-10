import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import { today } from "../utils/date-time";
import Search from "../components/Search";
import NewForm from "../components/NewForm";
import EditForm from "../components/EditForm";
import useQuery from "../utils/useQuery"
import TableForm from "../components/TableForm";

function Routes() {
  const query = useQuery()
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard date={query.get("date") || today()} />
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

      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
