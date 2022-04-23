import { Nav } from "features/nav";
import { FolderConnection, isFolder, NavItem } from "lib";
import { RefObject } from "react";
import { File } from "./File";
import { Folder } from "./Folder";
import { FolderScreenFrame, VerticalFrame } from "./styles";

export type FolderScreenParameters = {
  folders: FolderConnection["folders"];
  files: FolderConnection["files"];
  navs: Array<NavItem>;
  scrollRef: RefObject<HTMLDivElement>;
  onClickMeta: (id: string) => void;
  onClickSlides: (index: number) => void;
  onClickFolder: (id: string) => void;
};

export const EntriesView = ({
  folders,
  files,
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
        {folders?.map((entry) => (
          <Folder
            key={entry.id}
            entry={entry}
            onClickFolder={() => onClickFolder(entry.id)}
            onClickMeta={() => onClickMeta(entry.id)}
          />
        ))}
        {files?.map((entry, index) => (
          <File
            key={entry.id}
            entry={entry}
            onClickSlides={() => onClickSlides(index)}
            onClickMeta={() => onClickMeta(entry.id)}
          />
        ))}
      </FolderScreenFrame>
    </VerticalFrame>
  );
};
