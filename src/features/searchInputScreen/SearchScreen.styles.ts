import styled from "styled-components";
import { Form } from "formik";

export const FlexForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

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
