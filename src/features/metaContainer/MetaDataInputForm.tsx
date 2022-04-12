import { Form, Formik } from "formik";
import styled from "styled-components";
import { NavigateFunction } from "react-router-dom";

import {
  Characters,
  MetaData,
  AvailableMetaData,
  UpdateMetaDataMutationFn,
  isFolder,
  FormikMetaData,
} from "lib";
import { MetaDataPartialForm } from "features/metaDataPartialForm";
import { Frame } from "./styles";

type MetaDataInputFormParams = {
  metaData: MetaData;
  updateMetaDataMutation: UpdateMetaDataMutationFn;
  navigate: NavigateFunction;
  availableMetaData: AvailableMetaData;
};

export const MetaDataInputForm = ({
  metaData,
  updateMetaDataMutation,
  navigate,
  availableMetaData,
}: MetaDataInputFormParams) => (
  <Formik<FormikMetaData>
    initialValues={{
      metaData,
      availableMetaData,
      newTag: "",
      newKey: "",
      newValueStr: "",
      newType: "STRING",
    }}
    onSubmit={({ metaData }, { setSubmitting }) => {
      // console.log("==> onSubmit", metaData);

      // updateMetaDataMutation({
      //   variables: {
      //     id,
      //     metaDataInput,
      //   },
      // });
      setSubmitting(false);
      // navigate(-1);
    }}
    validate={(values) => {
      // console.log("==> validate", values);
    }}
  >
    {({
      values: {
        metaData: { id },
      },
      isSubmitting,
    }) => (
      <FlexForm>
        <HeaderContainer>
          <span>{isFolder(id) ? Characters.folder : Characters.file}</span>
          <EntryName>{id.split("/").slice(-1)[0]}</EntryName>
        </HeaderContainer>

        <Frame
          thumbImageUrl={`${process.env.REACT_APP_CLOUDFRONT_URL}/resizer?key=${id}&width=${process.env.REACT_APP_ICON_WIDTH}&height=${process.env.REACT_APP_ICON_HEIGHT}`}
        />

        <MetaDataPartialForm />

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
