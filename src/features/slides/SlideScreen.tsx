import { NavItem, Characters } from "lib";
import { Nav } from "features/nav";
import { Frame, Image, LeftSlideButton, RightSlideButton } from "./styles";
import { createRef, RefObject } from "react";

export type SlideScreenParams = {
  id: string;
  navs: Array<NavItem>;
  onClickNext: SlideNavFn;
  onClickPrev: SlideNavFn;
};

const navRef = createRef<HTMLDivElement>();

export const SlideScreen = ({
  id,
  navs,
  onClickNext,
  onClickPrev,
}: SlideScreenParams) => (
  <Frame>
    <Nav navs={navs} navRef={navRef}></Nav>
    <Image
      src={`${process.env.REACT_APP_CLOUDFRONT_URL}/resizer?key=${id}&width=${
        navRef.current?.clientWidth
      }&height=${
        document.documentElement.clientHeight -
        (navRef.current?.clientHeight || 0)
      }`}
      alt=""
    />

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

export type SlideNavFn = (() => void) | undefined;
