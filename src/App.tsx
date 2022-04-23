import { StrictMode } from "react";
import { Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";

import { BrowseContainer } from "features/browseContainer";
import { ImageScreen } from "features/imageScreen";
import { SearchScreenContainer } from "features/searchScreen";
import { MetaContainer } from "features/metaContainer";
import { SlidesContainer } from "features/slides";
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
                <Route
                  path={appRoutes.search}
                  element={<SearchScreenContainer />}
                />
                <Route path={appRoutes.image} element={<ImageScreen />} />
                <Route path={appRoutes.meta} element={<MetaContainer />} />
                <Route path={appRoutes.slides} element={<SlidesContainer />} />
              </Route>
            </Routes>
          </Router>
        </ThemeProvider>
      </ApolloProvider>
    </StrictMode>
  );
};
