import { useEffect, useContext, RefObject } from "react";
import { useLocation } from "react-router-dom";

import { FolderScreenFrame } from "./styles";
import { File } from "./File";
import { Folder } from "./Folder";
import { FolderConnection, MetaData, NavItem } from "lib";

export type FolderScreenParameters = {
  entries: FolderConnection["items"];
  navs: Array<NavItem>;
  // scrollRef: RefObject<HTMLDivElement>;
};

export const EntriesView = ({ entries }: FolderScreenParameters) => {
  return (
    <FolderScreenFrame>
      {entries?.map((entry) =>
        isFolder(entry) ? (
          <Folder key={entry.id} entry={entry} />
        ) : (
          <File key={entry.id} entry={entry} />
        )
      )}
    </FolderScreenFrame>
  );
};

const isFolder = ({ id }: MetaData) => id.slice(-1) === "/";
