import styled from "styled-components";

export const Frame = styled.div`
  min-height: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  height: auto;
  width: auto;
  display: block;
`;

const SlideButton = styled.div`
  position: absolute;
  width: 5rem;
  height: 5rem;
  border: 1px solid;
  border-radius: 2.5rem;
  top: 50%;
  font-size: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: aqua;
  cursor: default;
`;

export const LeftSlideButton = styled(SlideButton)`
  left: 5%;
`;

export const RightSlideButton = styled(SlideButton)`
  right: 5%;
`;
