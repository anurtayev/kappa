import { Form } from "formik";
import styled from "styled-components";

export const ExistingItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Frame = styled.div`
  width: 150px;
  max-width: 150px;
  height: 150px;
  margin: 0.2rem;
  background: darkslategrey;
  border-radius: 0.4rem;
  background-image: ${({ thumbImageUrl }: { thumbImageUrl: string }) =>
    `url("${thumbImageUrl}")`};
`;

export const FlexForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 1em;
`;
