import { PageHeader } from "antd";
import { appRoutes, useAppContext } from "lib";
import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { title, navs, email } = useAppContext();

  useEffect(() => {
    location.pathname === "/" && navigate(appRoutes.browse);
  }, [location, navigate]);

  return (
    <>
      <PageHeader title={title} extra={navs} subTitle={email} />
      <Outlet />
    </>
  );
};
