import { useNavigate, Route, useLocation, Routes } from "react-router-dom";
import styled from "styled-components";

import { appRoutes, Characters } from "lib";

export const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { pathname, search } = location;

  return (
    <Frame>
      <ActionButton
        onClick={() => {
          navigate("/");
        }}
      >
        {Characters.home}
      </ActionButton>
      <Routes>
        <Route path={appRoutes.browse}>
          <ActionButton onClick={() => navigate(appRoutes.browse)}>
            {Characters.label}
          </ActionButton>

          {/** Search */}
          <ActionButton onClick={() => navigate(appRoutes.search)}>
            {Characters.magnifyingGlass}
          </ActionButton>

          {/** Refresh */}
          <ActionButton>{Characters.refresh}</ActionButton>
        </Route>

        <Route path={appRoutes.browse}>
          <ActionButton onClick={() => navigate(appRoutes.browse)}>
            {Characters.arrowUp}
          </ActionButton>
        </Route>
      </Routes>

      <Id>{pathname}</Id>
    </Frame>
  );
};

const Frame = styled.div`
  display: flex;
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

const Id = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  margin-left: auto;
  margin-right: 2rem;
`;
