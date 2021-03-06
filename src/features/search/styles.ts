import { Form } from "formik";
import styled from "styled-components";

export const Section = styled.div`
  margin: 1rem 0 0 2rem;
`;

export const PictureSymbol = styled.span`
  font-size: 3rem;
`;

export const EntryName = styled.span`
  margin-left: 0.5rem;
`;

export const SubmitButton = styled.button`
  background: deepskyblue;
  margin-right: 1rem;
`;

export const SectionHeader = styled.h5`
  color: red;
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

export const HeaderContainer = styled.div`
  margin-bottom: 1rem;
`;
