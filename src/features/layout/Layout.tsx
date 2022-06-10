import { PageHeader } from "antd";
import { appRoutes } from "lib";
import { LayoutContext, LayoutContextType } from "lib/util";
import { ReactElement, useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [navs, setNavs] = useState<Array<ReactElement>>([]);
  const [title, setTitle] = useState<string>();
  const [ctx] = useState<LayoutContextType>({ setNavs, setTitle });

  useEffect(() => {
    location.pathname === "/" && navigate(appRoutes.auth);
  }, [location, navigate]);

  return (
    <>
      <PageHeader title={title} extra={navs} />
      <LayoutContext.Provider value={ctx}>
        <Outlet />
      </LayoutContext.Provider>
    </>
  );
};
