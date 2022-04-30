import { Formik } from "formik";
import {
  Attribute,
  Characters,
  getMediaName,
  InputType,
  isFolder,
  UpdateMetaDataMutationFn,
} from "lib";
import { NavigateFunction } from "react-router-dom";
import { MetaDataPartialForm } from "./MetaDataPartialForm";
import {
  ButtonContainer,
  EntryName,
  FlexForm,
  Frame,
  HeaderContainer,
  SubmitButton,
} from "./styles";
import { cleanseMetaDataInput, FormikMetaData, RequiredMetaData } from "./util";

type MetaDataInputFormParams = {
  id: string;
  metaDataInput: RequiredMetaData;
  updateMetaDataMutation: UpdateMetaDataMutationFn;
  navigate: NavigateFunction;
  availableAttributes: Array<Attribute> | undefined;
  availableTags: Array<string> | undefined;
};

export const MetaDataInputForm = ({
  id,
  metaDataInput,
  updateMetaDataMutation,
  navigate,
  availableAttributes,
  availableTags,
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

        <MetaDataPartialForm
          availableAttributes={availableAttributes}
          availableTags={availableTags}
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
