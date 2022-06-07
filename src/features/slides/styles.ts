import styled from "styled-components";

export const Frame = styled.div`
  min-height: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ImagePane = styled.div`
  max-width: 100%;
  max-height: 100%;
  height: 100%;
  width: 100%;
  display: block;
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  height: auto;
  width: auto;
  display: block;
`;
