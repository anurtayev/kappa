import React from "react";
import { Frame } from "./File.styles";

export type FileParams = {
  key: string;
};

export const File = ({ key }: FileParams) => (
  <Frame thumbImageUrl={process.env.REACT_APP_CLOUDFRONT_URL + "/graphql"} />
);
