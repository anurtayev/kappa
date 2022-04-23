import { Nav } from "features/nav";
import { FolderConnection, isFolder, NavItem } from "lib";
import { RefObject } from "react";
import { File } from "./File";
import { Folder } from "./Folder";
import { FolderScreenFrame, VerticalFrame } from "./styles";

export type FolderScreenParameters = {
  entries: FolderConnection["items"];
  navs: Array<NavItem>;
  scrollRef: RefObject<HTMLDivElement>;
  onClickMeta: (id: string) => void;
  onClickSlides: (index: number) => void;
  onClickFolder: (id: string) => void;
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
        {entries?.map((entry, index) =>
          isFolder(entry.id) ? (
            <Folder
              key={entry.id}
              entry={entry}
              onClickFolder={() => onClickFolder(entry.id)}
              onClickMeta={() => onClickMeta(entry.id)}
            />
          ) : (
            <File
              key={entry.id}
              entry={entry}
              onClickSlides={() => onClickSlides(index)}
              onClickMeta={() => onClickMeta(entry.id)}
            />
          )
        )}
      </FolderScreenFrame>
    </VerticalFrame>
  );
};
