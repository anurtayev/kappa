import { PageHeader } from "antd";
import { appRoutes } from "lib";
import { getMediaName, LayoutContext, LayoutContextType } from "lib/util";
import { ReactElement, useEffect, useState } from "react";
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

export const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [navs, setNavs] = useState<Array<ReactElement>>([]);
  const title = id === null ? "no name" : getMediaName(id);
  const [ctx] = useState<LayoutContextType>({ setNavs });

  useEffect(() => {
    location.pathname === "/" && navigate(appRoutes.browse);
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
