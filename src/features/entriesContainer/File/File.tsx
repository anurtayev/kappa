import React from "react";
import { Frame } from "./File.styles";
import { useNavigate } from "react-router-dom";

type FileParams = { id: string; thumbImageUrl: string; imageUrl: string };

export const File = ({ id, thumbImageUrl, imageUrl }: FileParams) => {
  const history = useNavigate();

  return (
    <Frame
      onClick={() => history.push("/image" + id)}
      thumbImageUrl={thumbImageUrl}
    />
  );
};
