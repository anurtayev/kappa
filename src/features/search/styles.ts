import styled from "styled-components";
import { Form } from "formik";
import { EntryFrame } from "lib";

export const Section = styled.div`
  margin: 1rem 0 0 2rem;
`;

export const PictureSymbol = styled.span`
  font-size: 3rem;
`;

export const EntryName = styled.span`
  font-size: 2rem;
  margin: 0 0 0 1rem;
`;

export const SubmitButton = styled.button`
  background: deepskyblue;
`;

export const SectionHeader = styled.h5`
  color: red;
`;

export const Frame = styled(styled.div`
  ${EntryFrame}
`)`
  background-image: ${({ thumbImageUrl }: { thumbImageUrl: string }) =>
    `url("${thumbImageUrl}")`};
`;

export const FlexForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 1em;
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
`;
