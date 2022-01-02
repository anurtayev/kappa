import styled from "styled-components";

import { EntryFrame } from "lib";

export const Frame = styled(styled.div`
  ${EntryFrame}
`)`
  background-image: ${({ thumbImageUrl }: { thumbImageUrl: string }) =>
    `url("${thumbImageUrl}")`};
`;
