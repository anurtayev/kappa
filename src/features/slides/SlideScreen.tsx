import { Nav } from "features/nav";
import { Characters, NavItem } from "lib";
import { createRef } from "react";
import { Frame, ImagePane, LeftSlideButton, RightSlideButton } from "./styles";
import { ImageAsync } from "./ImageAsync";

export type SlideScreenParams = {
  id: string;
  navs: Array<NavItem>;
  onClickNext: SlideNavFn;
  onClickPrev: SlideNavFn;
};

const navRef = createRef<HTMLDivElement>();
const frameRef = createRef<HTMLDivElement>();

export const SlideScreen = ({
  id,
  navs,
  onClickNext,
  onClickPrev,
}: SlideScreenParams) => {
  console.log("==> navRef", navRef, navRef.current);
  console.log("==> frameRef", frameRef, frameRef.current);

  return (
    <Frame ref={frameRef}>
      <Nav navs={navs} navRef={navRef}></Nav>
      <ImageAsync id={id} />

      {onClickPrev && (
        <LeftSlideButton onClick={onClickPrev}>
          {Characters.arrowLeft}
        </LeftSlideButton>
      )}
      {onClickNext && (
        <RightSlideButton onClick={onClickNext}>
          {Characters.arrowRight}
        </RightSlideButton>
      )}
    </Frame>
  );
};

export type SlideNavFn = (() => void) | undefined;
