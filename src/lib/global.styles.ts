import styled from "styled-components";

export const defaultTheme = {};

export const SmallButton = styled.div`
  font-size: 0.75rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: lightgrey;
  border: 1px solid;
  width: 1rem;
  height: 1rem;
  border-radius: 0 50% 50% 0;
  text-align: center;
  cursor: default;

  &:hover {
    background: darkgrey;
  }
`;

export const FormBrick = styled.div`
  font-size: 1rem;
  display: flex;
  margin: 0 0.5rem 0.5rem 0;
`;

export const ErrorMessage = styled.h6`
  color: red;
`;
