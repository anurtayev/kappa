import styled from "styled-components";

export const FolderScreenFrame = styled.div`
  min-height: 0;
  overflow: scroll;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export const VerticalFrame = styled.div`
  min-height: 0;
  overflow: scroll;
  display: flex;
  flex-direction: column;
`;

export const Entry = styled.div`
  position: relative;
  width: 150px;
  max-width: 150px;
  height: 150px;
  margin: 0.2rem;
  background: darkgrey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`;

export const PaddedSpan = styled.div`
  padding: 0 1rem 0 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  color: black;
  font-size: 0.5;
  text-align: center;
`;

export const ContextMenuButton = styled.div`
  width: 18px;
  height: 18px;
  border: solid 1px white;
  border-radius: 10px;
  color: white;
  font-size: x-small;
  display: flex;
  justify-content: center;
  cursor: pointer;
`;

export const ContextMenuButtonPane = styled.div`
  width: 20px;
  display: flex;
  flex-direction: column-reverse;
  margin: 0 1rem 1rem 0;
`;

export const ContexMenuPane = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: stretch;
`;
