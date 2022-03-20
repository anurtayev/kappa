import { useNavigate } from "react-router-dom";

import { Frame, PaddedSpan } from "./Folder.styles";

type FolderParams = { id: string };

export const Folder = ({ id }: FolderParams) => {
  const history = useNavigate();

  return (
    <Frame
      onClick={() => {
        history.push("/folder" + id);
      }}
    >
      <PaddedSpan>{id.split("/").slice(-1)[0]}</PaddedSpan>
    </Frame>
  );
};
