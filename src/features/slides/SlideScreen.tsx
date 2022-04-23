import { NavItem } from "lib";
import { Nav } from "features/nav";
import { Slide } from "./Slide";

export type SlideScreenParams = {
  id: string;
  navs: Array<NavItem>;
};

export const SlideScreen = ({ id, navs }: SlideScreenParams) => (
  <div>
    <Nav navs={navs}></Nav>
    <Slide id={id} />
  </div>
);
