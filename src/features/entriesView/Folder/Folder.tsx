import { Frame, PaddedSpan } from "./Folder.styles";
import { MetaData } from "lib";

type FolderParams = { entry: MetaData };

export const Folder = ({ entry: { id, attributes, tags } }: FolderParams) => (
  <Frame>
    <PaddedSpan>{id.split("/").slice(-1)[0]}</PaddedSpan>
  </Frame>
);
