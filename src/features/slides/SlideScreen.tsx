import { ImageAsync } from "./ImageAsync";
import { Frame } from "./styles";

export type SlideScreenParams = {
  id: string;
};

export const SlideScreen = ({ id }: SlideScreenParams) => (
  <Frame>
    <ImageAsync id={id} />
  </Frame>
);
export type SlideNavFn = (() => void) | undefined;
