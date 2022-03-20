import React from "react";
import { Routes, Route } from "react-router-dom";

import { FolderScreen } from "features/folderScreen";
import { ImageScreen } from "features/imageScreen";
import { MetaScreen } from "features/metaScreen";
import { SearchScreen } from "features/searchScreen";
import { Nav } from "features/nav";
import { appRoutes } from "lib";

export const App = () => (
  <>
    <Nav />

    {/**
     * Main view area
     */}
    <Routes>
      <Route path={appRoutes.browse}>
        <FolderScreen />
      </Route>
      <Route path={appRoutes.search}>
        <SearchScreen />
      </Route>
      <Route path={appRoutes.image}>
        <ImageScreen />
      </Route>
    </Routes>
  </>
);
