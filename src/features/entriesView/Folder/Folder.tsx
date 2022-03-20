import { Frame, PaddedSpan } from "./Folder.styles";

type FolderParams = { key: string };

export const Folder = ({ key }: FolderParams) => (
  <Frame>
    <PaddedSpan>{key.split("/").slice(-1)[0]}</PaddedSpan>
  </Frame>
);
