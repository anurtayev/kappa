import { useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";

import { FolderScreenFrame } from "./FolderScreen.styles";
import { File } from "./File";
import { Folder } from "./Folder";

export const FolderScreen = () => {
  const { imagesDivRef, saveScrollTopFn, restoreScrollTopFn, slides } =
    useContext(StateContext);
  const location = useLocation();

  useEffect(() => {
    restoreScrollTopFn(location);
  });

  return (
    <FolderScreenFrame
      ref={imagesDivRef}
      onClick={() => {
        saveScrollTopFn(location);
      }}
    >
      {slides.entries.map((entry) =>
        entry.__typename === "File" ? (
          <File key={entry.id} {...entry} />
        ) : (
          <Folder key={entry.id} {...entry} />
        )
      )}
    </FolderScreenFrame>
  );
};
