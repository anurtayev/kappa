import { PageHeader } from "antd";
import {
  appRoutes,
  LayoutContext,
  LayoutContextType,
  GetUserProfileQueryVariables,
  GetUserProfileDocument,
  GetUserProfileQuery,
} from "lib";
import { ReactElement, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useApolloClient } from "@apollo/client";

export const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const client = useApolloClient();

  const [navs, setNavs] = useState<Array<ReactElement>>([]);
  const [title, setTitle] = useState<string>();
  const [ctx] = useState<LayoutContextType>({ setNavs, setTitle });

  const getUserProfileQueryResult = client.readQuery<
    GetUserProfileQuery,
    GetUserProfileQueryVariables
  >({
    query: GetUserProfileDocument,
  });

  useEffect(() => {
    if (!getUserProfileQueryResult?.userProfile) {
      navigate(appRoutes.auth);
    } else if (location.pathname === "/") {
      navigate(appRoutes.browse);
    }
  }, [location, navigate, getUserProfileQueryResult]);

  return (
    <>
      <PageHeader
        title={title}
        extra={navs}
        subTitle={getUserProfileQueryResult?.userProfile?.email}
      />
      <LayoutContext.Provider value={ctx}>
        <Outlet />
      </LayoutContext.Provider>
    </>
  );
};
