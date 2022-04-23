import { MetaDataPartialForm } from "features/metaDataPartialForm";
import { Formik } from "formik";
import { SearchInput, useSearchQuery } from "lib";
import { useNavigate } from "react-router-dom";
import { FlexForm, Section, SubmitButton } from "./SearchScreen.styles";

export const SearchScreenContainer = () => {
  const navigate = useNavigate();
  const searchInput: SearchInput = { filter: {} };

  const { data, loading, error } = useSearchQuery({
    variables: {
      searchInput,
      pageSize: 10,
      nextToken: null,
    },
  });

  if (loading) return <p>Loading</p>;
  if (error || !data) return <p>Error</p>;

  const folders = data.search?.folders;
  const files = data.search?.files;
  const nextToken = data.search?.nextToken;

  return (
    <Formik
      initialValues={{ tags: [], attributes: [] }}
      onSubmit={({ tags, attributes }, { setSubmitting }) => {
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <FlexForm>
          <MetaDataPartialForm />

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
