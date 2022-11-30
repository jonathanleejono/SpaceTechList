import { ChakraProvider } from "@chakra-ui/react";
import { adminRoute, authRoute } from "constants/routes";
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import "./assets/css/App.css";
import AdminLayout from "./layouts/admin";
import AuthLayout from "./layouts/auth";
import theme from "./theme/theme";

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <React.StrictMode>
      <HashRouter>
        <Switch>
          <Route path={authRoute} component={AuthLayout} />
          <Route path={adminRoute} component={AdminLayout} />
          <Redirect from="/" to={adminRoute} />
        </Switch>
      </HashRouter>
    </React.StrictMode>
  </ChakraProvider>,
  document.getElementById("root")
);
