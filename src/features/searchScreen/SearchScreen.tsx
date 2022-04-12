import { Formik } from "formik";

import { MetaDataPartialForm } from "features/metaDataPartialForm";
import { FlexForm, Section, SubmitButton } from "./SearchScreen.styles";

export const SearchScreen = () => (
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
          <button type="button" onClick={() => {}}>
            Cancel
          </button>
        </Section>
      </FlexForm>
    )}
  </Formik>
);
