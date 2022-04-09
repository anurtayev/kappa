import { RefObject, MouseEventHandler } from "react";

import { FolderConnection, NavItem, isFolder } from "lib";
import { FolderScreenFrame, VerticalFrame } from "./styles";
import { File } from "./File";
import { Folder } from "./Folder";
import { Nav } from "features/nav";

export type FolderScreenParameters = {
  entries: FolderConnection["items"];
  navs: Array<NavItem>;
  scrollRef: RefObject<HTMLDivElement>;
  onClickMeta: MouseEventHandler;
  onClickSlides: MouseEventHandler;
  onClickFolder: MouseEventHandler;
};

export const EntriesView = ({
  entries,
  navs,
  scrollRef,
  onClickFolder,
  onClickMeta,
  onClickSlides,
}: FolderScreenParameters) => {
  return (
    <VerticalFrame>
      <Nav navs={navs}></Nav>
      <FolderScreenFrame ref={scrollRef}>
        {entries?.map((entry) =>
          isFolder(entry.id) ? (
            <Folder
              key={entry.id}
              entry={entry}
              onClickFolder={onClickFolder}
              onClickMeta={onClickMeta}
            />
          ) : (
            <File
              key={entry.id}
              entry={entry}
              onClickSlides={onClickSlides}
              onClickMeta={onClickMeta}
            />
          )
        )}
      </FolderScreenFrame>
    </VerticalFrame>
  );
};
