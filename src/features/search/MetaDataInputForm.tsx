import { MetaDataContainer } from "features/metaDataForm";
import { Form, Formik, FormikHelpers } from "formik";
import {
  AttributeSortTerm,
  AttributeValueInput,
  FormikMetaData,
  InputType,
  Scalars,
  SearchInput,
  SortOrder,
} from "lib";
import styled from "styled-components";

type SearchInputFormType = {
  filter: {
    attributes: Array<AttributeValueInput>;
    tags: Array<Scalars["String"]>;
  };
  searchAttributeValueStr: "";

  sorter: Array<AttributeSortTerm>;
  searchSortOrder: SortOrder;
};

export type SubmitFn = (
  values: SearchInputFormType,
  formikHelpers: FormikHelpers<SearchInputFormType>
) => void;
type SearchInputFormParams = {
  onSubmitSearchInput: SubmitFn;
};

export const SearchInputForm = ({
  onSubmitSearchInput,
}: SearchInputFormParams) => (
  <Formik<SearchInputFormType>
    initialValues={{
      filter: {
        attributes: [],
        tags: [],
      },
      searchAttributeValueStr: "",
      sorter: [],
      searchSortOrder: SortOrder.Asc,
    }}
    onSubmit={onSubmitSearchInput}
  >
    {({ isSubmitting }) => (
      <FlexForm>
        <MetaDataContainer />

        <ButtonContainer>
          <SubmitButton type="submit" disabled={isSubmitting}>
            Submit
          </SubmitButton>
          <button type="button" onClick={() => {}}>
            Cancel
          </button>
        </ButtonContainer>
      </FlexForm>
    )}
  </Formik>
);

const FlexForm = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 1em;
`;

const SubmitButton = styled.button`
  background: deepskyblue;
  margin-right: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
`;
