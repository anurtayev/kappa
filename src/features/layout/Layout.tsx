import { PageHeader } from "antd";
import { appRoutes, useAppContext } from "lib";
import { useEffect } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  ScrollRestoration,
} from "react-router-dom";

export const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, navs, session } = useAppContext();

  useEffect(() => {
    location.pathname === "/" && navigate(appRoutes.browse, { replace: true });
  }, [location, navigate]);

  return (
    <>
      <PageHeader
        title={title}
        extra={navs}
        subTitle={session?.getIdToken().payload.email}
      />
      <Outlet />
      <ScrollRestoration />
    </>
  );
};
