import { Field } from "formik";
import styled from "styled-components";

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
