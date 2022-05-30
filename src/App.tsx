import { StrictMode } from "react";
import { Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";

import { BrowseContainer } from "features/browse";
import { ImageScreen } from "features/image";
import { SearchContainer } from "features/search";
import { MetaContainer } from "features/meta";
import { SlidesContainer } from "features/slides";
import { ErrorBoundary } from "features/errorBoundary";
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
            uri: "/graphql",
            cache,
            connectToDevTools: true,
          })
        }
      >
        <ThemeProvider theme={defaultTheme}>
          <ErrorBoundary>
            <Router>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route
                    path={appRoutes.browse}
                    element={<BrowseContainer />}
                  />
                  <Route
                    path={appRoutes.search}
                    element={<SearchContainer />}
                  />
                  <Route path={appRoutes.image} element={<ImageScreen />} />
                  <Route path={appRoutes.meta} element={<MetaContainer />} />
                  <Route
                    path={appRoutes.slides}
                    element={<SlidesContainer />}
                  />
                </Route>
              </Routes>
            </Router>
          </ErrorBoundary>
        </ThemeProvider>
      </ApolloProvider>
    </StrictMode>
  );
};
