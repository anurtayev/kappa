import { Frame, PaddedSpan } from "./Folder.styles";
import { MetaData } from "lib";

type FolderParams = { entry: MetaData };

export const Folder = ({ entry: { id, attributes, tags } }: FolderParams) => (
  <Frame data-isfolder data-key={id}>
    <PaddedSpan>{id.split("/").slice(1, -1)}</PaddedSpan>
  </Frame>
);
