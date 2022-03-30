import { useEffect, useContext, RefObject } from "react";
import { useLocation } from "react-router-dom";

import { FolderScreenFrame } from "./styles";
import { File } from "./File";
import { Folder } from "./Folder";
import { FolderConnection, MetaData } from "lib";

export type FolderScreenParameters = {
  entries: FolderConnection["items"];
  // scrollRef: RefObject<HTMLDivElement>;
};

export const EntriesView = ({ entries }: FolderScreenParameters) => {
  return (
    <FolderScreenFrame>
      {entries?.map((entry) =>
        isFolder(entry) ? (
          <File key={entry.id} entry={entry} />
        ) : (
          <Folder key={entry.id} entry={entry} />
        )
      )}
    </FolderScreenFrame>
  );
};

const isFolder = (entry: MetaData) => entry.id.slice(-1) === "/";
