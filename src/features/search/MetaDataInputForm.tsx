import { MetaDataContainer } from "features/metaDataForm";
import { Form, Formik } from "formik";
import { FormikMetaData, InputType, SearchInput } from "lib";
import styled from "styled-components";

type SearchInputFormType = {
  filter: Pick<Required<SearchInput>, "filter">;
  sorter: Pick<Required<SearchInput>, "sorter">;
};

type SearchInputFormParams = {
  onSubmitSearchInput: (searchInput: SearchInput) => void;
};

export const SearchInputForm = ({}: SearchInputFormParams) => (
  <Formik<FormikMetaData>
    initialValues={{
      metaDataInput: { attributes: [], tags: [] },
      newTag: "",
      newKey: "",
      newValueStr: "",
      newType: InputType.String,
    }}
    onSubmit={async ({ metaDataInput }, { setSubmitting }) => {
      try {
      } catch (error) {
        console.error(error);
      }
    }}
    validate={({ newKey, newTag, newValueStr, newType }) => {
      // console.log("==> validate", newTag, newKey, newType, newValueStr);
    }}
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
