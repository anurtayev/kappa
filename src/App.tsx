import { useEffect, StrictMode } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";

import { BrowseContainer } from "features/browseContainer";
import { ImageScreen } from "features/imageScreen";
import { SearchScreen } from "features/searchScreen";
import { Layout } from "./features/layout";
import { appRoutes } from "lib";
import { defaultTheme } from "lib";
import { cache } from "cache";

export const App = () => {
  return (
    <StrictMode>
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
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path={appRoutes.browse} element={<BrowseContainer />} />
                <Route path={appRoutes.search} element={<SearchScreen />} />
                <Route path={appRoutes.image} element={<ImageScreen />} />
              </Route>
            </Routes>
          </Router>
        </ThemeProvider>
      </ApolloProvider>
    </StrictMode>
  );
};
