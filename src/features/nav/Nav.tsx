import { NavItem } from "lib";
import { RefObject } from "react";
import styled from "styled-components";

type NavParams = {
  navs: Array<NavItem>;
  navRef?: RefObject<HTMLDivElement> | undefined;
};

export const Nav = ({ navs, navRef }: NavParams) => {
  return (
    <Frame ref={navRef}>
      {navs.map(({ navFn, icon }, index) => (
        <ActionButton key={index} onClick={navFn}>
          {icon}
        </ActionButton>
      ))}
    </Frame>
  );
};

const Frame = styled.div`
  display: flex;
  width: 100%;
`;

const ActionButton = styled.div`
  font-size: 2rem;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
  background: green;
  margin: 1rem 0 1rem 1rem;
  cursor: default;
  flex-shrink: 0;

  background-position: center;
  transition: background 0.8s;

  &:hover {
    background: #47a7f5 radial-gradient(cirle, transparent 1%, #47a7f5 1%)
      center/15000%;
  }

  &:active {
    background-color: lime;
    background-size: 100%;
    transition: background 0s;
  }
`;
