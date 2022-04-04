import { MouseEventHandler } from "react";
import { Frame, PaddedSpan } from "./Folder.styles";
import { MetaData, EntryType, EntryAction } from "lib";

type FolderParams = {
  entry: MetaData;
  onClickMeta: MouseEventHandler;
  onClickFolder: MouseEventHandler;
};

export const Folder = ({
  entry: { id, attributes, tags },
  onClickFolder,
}: FolderParams) => (
  <Frame data-key={id} onClick={onClickFolder}>
    <PaddedSpan>{id.split("/").slice(1, -1)}</PaddedSpan>
  </Frame>
);
