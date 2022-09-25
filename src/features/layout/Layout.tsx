import { PageHeader } from "antd";
import { useAppContext, STARTER_ROUTE } from "lib";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, navs, session, subTitle } = useAppContext();

  useEffect(() => {
    if (location.pathname === "/") {
      if (!process.env.REACT_APP_MEDIA_ROOT) {
        throw new Error("REACT_APP_MEDIA_ROOT is missing");
      }

      navigate(STARTER_ROUTE, {
        replace: true,
      });
    }
  }, [location, navigate]);

  return (
    <>
      <PageHeader title={title} extra={navs} subTitle={subTitle} />
      <Outlet />
    </>
  );
};
