import React from "react";
import { Routes, Route } from "react-router-dom";

import { FolderScreen } from "features/folderScreen";
import { ImageScreen } from "features/imageScreen";
import { SearchScreen } from "features/searchScreen";
import { Layout } from "./features/layout";
import { appRoutes } from "lib";

export const App = () => (
  <>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path={appRoutes.browse} element={<FolderScreen />} />
        <Route path={appRoutes.search} element={<SearchScreen />} />
        <Route path={appRoutes.image} element={<ImageScreen />} />
      </Route>
    </Routes>
  </>
);
