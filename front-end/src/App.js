import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./layout/Layout";

/**
 * Defines the root application component.
 * You will not need to make changes to this file.
 * @returns {JSX.Element}
 */
function App() {
  return (
    <Switch>
      <Route path="/">
        <Layout />
      </Route>
    </Switch>
  );
}

export default App;
