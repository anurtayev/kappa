import { MouseEventHandler } from "react";
import { Frame, PaddedSpan } from "./Folder.styles";
import { MetaData } from "lib";

type FolderParams = {
  entry: MetaData;
  onClickMeta: MouseEventHandler;
  onClickFolder: MouseEventHandler;
};

export const Folder = ({ entry: { id }, onClickFolder }: FolderParams) => (
  <Frame data-key={id} onClick={onClickFolder}>
    <PaddedSpan>{id.split("/").slice(1, -1)}</PaddedSpan>
  </Frame>
);
