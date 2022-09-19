import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";
import { cache } from "cache";
import { BrowseContainer } from "features/browse";
import { ErrorBoundary } from "features/errorBoundary";
import { Layout } from "features/layout";
import { MetaContainer } from "features/meta";
import { MfaContainer } from "features/mfa";
import { MfaSetupContainer } from "features/mfaSetup";
import { NewPwdContainer } from "features/newPwd";
import { SearchContainer } from "features/search";
import { AuthContainer } from "features/signin";
import { SlidesContainer } from "features/slides";
import { TotpContainer } from "features/totp";
import { AppProvider, appRoutes, defaultTheme, RequireAuth } from "lib";
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
            <AppProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route
                      path={appRoutes.signin}
                      element={<AuthContainer />}
                    />
                    <Route path={appRoutes.mfa} element={<MfaContainer />} />
                    <Route
                      path={appRoutes.mfaSetup}
                      element={<MfaSetupContainer />}
                    />
                    <Route
                      path={appRoutes.newpwd}
                      element={<NewPwdContainer />}
                    />
                    <Route path={appRoutes.totp} element={<TotpContainer />} />
                    <Route
                      path={`${appRoutes.browse}/*`}
                      element={
                        <RequireAuth>
                          <BrowseContainer />
                        </RequireAuth>
                      }
                    />
                    <Route
                      path={`${appRoutes.search}/:search`}
                      element={
                        <RequireAuth>
                          <SearchContainer />
                        </RequireAuth>
                      }
                    />
                    <Route
                      path={`${appRoutes.meta}/*`}
                      element={
                        <RequireAuth>
                          <MetaContainer />
                        </RequireAuth>
                      }
                    />
                    <Route
                      path={`${appRoutes.slides}/:id`}
                      element={
                        <RequireAuth>
                          <SlidesContainer />
                        </RequireAuth>
                      }
                    />
                  </Route>
                </Routes>
              </Router>
            </AppProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </ApolloProvider>
    </StrictMode>
  );
};
