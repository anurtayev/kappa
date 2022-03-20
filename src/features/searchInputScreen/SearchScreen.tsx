import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";

import {
  MetaDataForm,
  getFolderPathname,
  GetRepoMetaData,
  GET_REPO_METADATA,
} from "lib";
import { MetaDataPartialForm } from "features/metaDataPartialForm";
import { FlexForm, Section, SubmitButton } from "./SearchScreen.styles";

export const SearchScreen = () => {
  const navigate = useNavigate();

  const { loading, error, data } = useQuery<GetRepoMetaData>(
    GET_REPO_METADATA,
    {
      fetchPolicy: "no-cache",
    }
  );

  if (loading) return <p>Loading</p>;
  if (error || !data) return <p>Error</p>;

  const { tags, attributes } = data;

  const initialValues: MetaDataForm = {
    tags: [],
    attributes: [],
    newTag: "",
    newKey: "",
    newValue: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={({ tags, attributes }, { setSubmitting }) => {
        setSubmitting(false);

        navigate(
          getFolderPathname({
            metaDataInput: {
              tags: tags || [],
              attributes: attributes || [],
            },
          })
        );
      }}
    >
      {({ isSubmitting }) => (
        <FlexForm>
          <MetaDataPartialForm
            availableAttributes={attributes}
            availableTags={tags}
          />

          <Section>
            <SubmitButton type="submit" disabled={isSubmitting}>
              Submit
            </SubmitButton>
            <button type="button" onClick={() => navigate("")}>
              Cancel
            </button>
          </Section>
        </FlexForm>
      )}
    </Formik>
  );
};
