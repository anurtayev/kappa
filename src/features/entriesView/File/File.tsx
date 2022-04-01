import React from "react";
import { Frame } from "./File.styles";
import { MetaData } from "lib";

export type FileParams = {
  entry: MetaData;
};

export const File = ({ entry: { id, tags, attributes } }: FileParams) => (
  <Frame
    data-key={id}
    thumbImageUrl={`${process.env.REACT_APP_CLOUDFRONT_URL}/resizer?key=${id}&width=${process.env.REACT_APP_ICON_WIDTH}&height=${process.env.REACT_APP_ICON_HEIGHT}`}
  />
);