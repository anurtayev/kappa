import { Formik } from "formik";
import { useNavigate } from "react-router-dom";

import { useSearchQuery, SearchInput } from "lib";
import { MetaDataPartialForm } from "features/metaDataPartialForm";
import { FlexForm, Section, SubmitButton } from "./SearchScreen.styles";

export const SearchScreen = () => {
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

  const items = data.search?.items;
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
          <MetaDataPartialForm availableAttributes={[]} availableTags={[]} />

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
