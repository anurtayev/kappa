import React from "react";
import { Frame } from "./File.styles";
import { MetaData, EntryType, EntryAction } from "lib";

export type FileParams = {
  entry: MetaData;
};

export const File = ({ entry: { id, tags, attributes } }: FileParams) => (
  <Frame
    data-key={id}
    data-type={EntryType.file}
    data-action={EntryAction.navigate}
    thumbImageUrl={`${process.env.REACT_APP_CLOUDFRONT_URL}/resizer?key=${id}&width=${process.env.REACT_APP_ICON_WIDTH}&height=${process.env.REACT_APP_ICON_HEIGHT}`}
  />
);
