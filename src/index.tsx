import React from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";

import "./index.css";
import { App } from "./App";
import { defaultTheme, appRoutes } from "lib";
import { cache } from "cache";

ReactDOM.render(
  <ApolloProvider
    client={
      new ApolloClient<NormalizedCacheObject>({
        uri: process.env.REACT_APP_CLOUDFRONT_URL + "/graphql",
        cache,
        connectToDevTools: true,
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
