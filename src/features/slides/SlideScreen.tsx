import { NavItem } from "lib";
import { Nav } from "features/nav";
import { Slide } from "./Slide";

export type SlideScreenParams = {
  id: string;
  navs: Array<NavItem>;
  onClickNext: SlideNavFn;
  onClickPrev: SlideNavFn;
};

export const SlideScreen = ({
  id,
  navs,
  onClickNext,
  onClickPrev,
}: SlideScreenParams) => (
  <div>
    <Nav navs={navs}></Nav>
    <Slide id={id} />
    {onClickPrev && <button onClick={onClickPrev}>Prev</button>}
    {onClickNext && <button onClick={onClickNext}>Next</button>}
  </div>
);

export type SlideNavFn = (() => void) | undefined;
