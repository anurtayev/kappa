import { useEffect, useContext, RefObject } from "react";
import { useLocation } from "react-router-dom";

import { FolderScreenFrame } from "./FolderScreen.styles";
import { File } from "./File";
import { Folder } from "./Folder";

export type FolderScreenParameters = {
  entries: string[];
  scrollRef: RefObject<HTMLDivElement>;
};

export const FolderScreen = ({
  entries,
  scrollRef,
}: FolderScreenParameters) => {
  return (
    <FolderScreenFrame ref={scrollRef}>
      {entries.map((entry) =>
        isFolder(entry) ? <File key={entry} /> : <Folder key={entry} />
      )}
    </FolderScreenFrame>
  );
};

const isFolder = (entry: string) => entry.slice(-1) === "/";
