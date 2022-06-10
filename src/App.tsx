import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";
import { cache } from "cache";
import { AuthContainer } from "features/auth";
import { ErrorBoundary } from "features/errorBoundary";
import { ImageScreen } from "features/image";
import { Layout } from "features/layout";
import { MetaContainer } from "features/meta";
import { SearchContainer } from "features/search";
import { SlidesContainer } from "features/slides";
import { appRoutes, defaultTheme } from "lib";
import { StrictMode } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";

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
          <ErrorBoundary>
            <Router>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route path={appRoutes.auth} element={<AuthContainer />} />
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
