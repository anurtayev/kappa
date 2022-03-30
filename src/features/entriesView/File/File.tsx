import React from "react";
import { Frame } from "./File.styles";
import { MetaData } from "lib";

export type FileParams = {
  entry: MetaData;
};

export const File = ({ entry: { id, tags, attributes } }: FileParams) => (
  <Frame thumbImageUrl={process.env.REACT_APP_CLOUDFRONT_URL + "/graphql"} />
);
