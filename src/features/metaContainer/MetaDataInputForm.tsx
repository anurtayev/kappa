import { Form, Formik } from "formik";
import styled from "styled-components";
import { NavigateFunction } from "react-router-dom";

import {
  Characters,
  MetaDataInput,
  UpdateMetaDataMutationFn,
  isFolder,
  Attribute,
  Scalars,
} from "lib";
import { MetaDataPartialForm } from "features/metaDataPartialForm";

type MetaDataInputFormParams = {
  id: string;
  metaDataInput: MetaDataInput;
  updateMetaDataMutation: UpdateMetaDataMutationFn;
  navigate: NavigateFunction;
  availableTags: Array<Scalars["String"]>;
  availableAttributes: Array<Attribute>;
};

export const MetaDataInputForm = ({
  id,
  metaDataInput,
  updateMetaDataMutation,
  navigate,
  availableAttributes = [],
  availableTags = [],
}: MetaDataInputFormParams) => (
  <Formik
    initialValues={{ metaDataInput, availableTags, availableAttributes }}
    onSubmit={({ metaDataInput }, { setSubmitting }) => {
      updateMetaDataMutation({
        variables: {
          id,
          metaDataInput,
        },
      });
      setSubmitting(false);
      navigate(-1);
    }}
  >
    {({ isSubmitting }) => (
      <FlexForm>
        <HeaderContainer>
          <span>{isFolder(id) ? Characters.folder : Characters.file}</span>
          <EntryName>{id.split("/").slice(-1)[0]}</EntryName>
        </HeaderContainer>

        <MetaDataPartialForm
          availableAttributes={availableAttributes}
          availableTags={availableTags}
          metaDataInput={metaDataInput}
        />

        <ButtonContainer>
          <SubmitButton type="submit" disabled={isSubmitting}>
            Submit
          </SubmitButton>
          <button type="button" onClick={() => navigate(-1)}>
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

const EntryName = styled.span`
  margin-left: 0.5rem;
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

const HeaderContainer = styled.div`
  margin-bottom: 1rem;
`;
