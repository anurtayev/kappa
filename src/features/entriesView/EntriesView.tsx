import { useEffect, useContext, RefObject } from "react";
import { useLocation } from "react-router-dom";

import { FolderConnection, MetaData, NavItem } from "lib";
import { FolderScreenFrame, VerticalFrame } from "./styles";
import { File } from "./File";
import { Folder } from "./Folder";
import { Nav } from "features/nav";

export type FolderScreenParameters = {
  entries: FolderConnection["items"];
  navs: Array<NavItem>;
  // scrollRef: RefObject<HTMLDivElement>;
};

export const EntriesView = ({ entries, navs }: FolderScreenParameters) => {
  return (
    <VerticalFrame>
      <Nav navs={navs}></Nav>
      <FolderScreenFrame>
        {entries?.map((entry) =>
          isFolder(entry) ? (
            <Folder key={entry.id} entry={entry} />
          ) : (
            <File key={entry.id} entry={entry} />
          )
        )}
      </FolderScreenFrame>
    </VerticalFrame>
  );
};

const isFolder = ({ id }: MetaData) => id.slice(-1) === "/";
