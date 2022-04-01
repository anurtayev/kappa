import React, { useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  useHref,
} from "react-router-dom";

import { FolderScreen } from "features/folderScreen";
import { ImageScreen } from "features/imageScreen";
import { SearchScreen } from "features/searchScreen";
import { Layout } from "./features/layout";
import { appRoutes } from "lib";

export const App = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    location.pathname === "/" && navigate(appRoutes.browse);
  }, [location]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path={appRoutes.browse} element={<FolderScreen />} />
          <Route path={appRoutes.search} element={<SearchScreen />} />
          <Route path={appRoutes.image} element={<ImageScreen />} />
          <Route path={"*"} element={<FolderScreen />} />
        </Route>
      </Routes>
    </>
  );
};
