import { MetaDataContainer } from "features/metaDataForm";
import { Form, Formik } from "formik";
import {
  Characters,
  cleanseMetaDataInput,
  FormikMetaData,
  getMediaName,
  InputType,
  isFolder,
  RequiredMetaData,
  UpdateMetaDataMutationFn,
} from "lib";
import { NavigateFunction } from "react-router-dom";
import styled from "styled-components";
import { Frame } from "./styles";

type MetaDataInputFormParams = {
  id: string;
  metaDataInput: RequiredMetaData;
  updateMetaDataMutation: UpdateMetaDataMutationFn;
  navigate: NavigateFunction;
};

export const MetaDataInputForm = ({
  id,
  metaDataInput,
  updateMetaDataMutation,
  navigate,
}: MetaDataInputFormParams) => (
  <Formik<FormikMetaData>
    initialValues={{
      metaDataInput,
      newTag: "",
      newKey: "",
      newValueStr: "",
      newType: InputType.String,
    }}
    onSubmit={async ({ metaDataInput }, { setSubmitting }) => {
      try {
        await updateMetaDataMutation({
          variables: {
            id,
            metaDataInput: cleanseMetaDataInput(metaDataInput),
          },
        });
        console.log("==> 2");

        setSubmitting(false);
        navigate(-1);
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
        <HeaderContainer>
          <span>{isFolder(id) ? Characters.folder : Characters.file}</span>
          <EntryName>{getMediaName(id)}</EntryName>
        </HeaderContainer>

        <Frame
          thumbImageUrl={`${process.env.REACT_APP_CLOUDFRONT_URL}/resizer?key=${id}&width=${process.env.REACT_APP_ICON_WIDTH}&height=${process.env.REACT_APP_ICON_HEIGHT}`}
        />

        <MetaDataContainer />

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
