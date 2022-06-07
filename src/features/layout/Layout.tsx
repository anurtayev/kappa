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
  const [navs, setNavs] = useState<Array<ReactElement>>([]);
  const [title, setTitle] = useState<string>();
  const [ctx] = useState<LayoutContextType>({ setNavs, setTitle });

  useEffect(() => {
    const id = searchParams.get("id");
    id && setTitle(getMediaName(id));
  }, [searchParams]);

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
