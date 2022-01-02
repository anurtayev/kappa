import styled from "styled-components";

import { EntryFrame } from "lib";

export const Frame = styled(styled.div`
  ${EntryFrame}
`)`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

export const PaddedSpan = styled.div`
  padding: 0 1rem 0 1rem;
  overflow: hidden;
  text-overflow: ellipsis;
  color: white;
  font-size: 0.5;
  text-align: center;
`;
