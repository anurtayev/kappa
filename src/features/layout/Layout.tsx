import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { appRoutes } from "lib";

export const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    location.pathname === "/" && navigate(appRoutes.browse);
  }, [location]);

  return (
    <div>
      <Outlet />
    </div>
  );
};
