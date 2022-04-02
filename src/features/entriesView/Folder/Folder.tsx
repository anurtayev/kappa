import { Frame, PaddedSpan } from "./Folder.styles";
import { MetaData, EntryType, EntryAction } from "lib";

type FolderParams = { entry: MetaData };

export const Folder = ({ entry: { id, attributes, tags } }: FolderParams) => (
  <Frame
    data-key={id}
    data-type={EntryType.folder}
    data-action={EntryAction.navigate}
  >
    <PaddedSpan>{id.split("/").slice(1, -1)}</PaddedSpan>
  </Frame>
);
