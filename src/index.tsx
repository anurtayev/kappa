import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import { App } from "./App";
import { defaultTheme, appRoutes } from "lib";

if (window.location.pathname === "/")
  window.location.assign(`${appRoutes.folder}/`);

ReactDOM.render(
  <ApolloProvider
    client={
      new ApolloClient({
        uri: process.env.REACT_APP_GRAPHQL_SERVER_URL,
        cache: new InMemoryCache(),
      })
    }
  >
    <ThemeProvider theme={defaultTheme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById("root")
);
