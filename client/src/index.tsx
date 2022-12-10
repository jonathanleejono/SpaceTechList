import { adminRoute, authRoute } from "constants/routes";
import AppProviders from "providers/appProviders";
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import "./assets/css/App.css";
import AdminLayout from "./layouts/admin";
import AuthLayout from "./layouts/auth";

ReactDOM.render(
  <React.StrictMode>
    <AppProviders>
      <HashRouter>
        <Switch>
          <Route path={authRoute} component={AuthLayout} />
          <Route path={adminRoute} component={AdminLayout} />
          <Redirect from="/" to={authRoute} />
        </Switch>
      </HashRouter>
    </AppProviders>
  </React.StrictMode>,
  document.getElementById("root")
);
