import { Field } from "formik";
import styled from "styled-components";
import { Form } from "formik";

export const SectionHeader = styled.h5`
  color: #1187f6;
  margin: 0 0 0.2rem 0;
`;

export const ElemBox = styled.div`
  border: 1px solid;
  padding: 0 0.2rem 0 0.2rem;
  background: lightgrey;
  height: 1rem;
  font-size: 0.75rem;
`;

export const ElemBoxValue = styled(ElemBox)`
  background: none;
`;

export const ExistingItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const StyledField = styled(Field)`
  height: 0.76rem;
  width: 10rem;
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

export const HeaderContainer = styled.div`
  margin-bottom: 1rem;
`;

export const EntryName = styled.span`
  margin-left: 0.5rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
`;

export const SubmitButton = styled.button`
  background: deepskyblue;
  margin-right: 1rem;
`;
