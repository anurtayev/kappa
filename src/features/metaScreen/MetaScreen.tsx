import React, { useContext } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Form, Formik } from "formik";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import {
  Characters,
  MetaDataForm,
  SET_METADATA,
  GET_METADATA,
  GetMetaData,
  GetMetaDataVariables,
  SetMetaData,
  SetMetaDataVariables,
  getId,
} from "lib";
import { MetaDataPartialForm } from "features/metaDataPartialForm";

export const MetaScreen = () => {
  const history = useNavigate();
  const { imagePathname, folderPathname, search } = useContext(StateContext);
  const { pathname } = useLocation();
  const id = getId(pathname);

  const [setMetaData] = useMutation<SetMetaData, SetMetaDataVariables>(
    SET_METADATA
  );

  const { loading, error, data } = useQuery<GetMetaData, GetMetaDataVariables>(
    GET_METADATA,
    {
      variables: { id },
      fetchPolicy: "no-cache",
    }
  );

  if (loading || !data) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  const { entry, tags: availableTags, attributes: availableAttributes } = data;
  if (!entry) throw new Error("entry not found");

  const { metaData, __typename } = entry;

  const initialValues: MetaDataForm = {
    tags: metaData && metaData.tags ? metaData.tags : [],
    attributes: metaData && metaData.attributes ? metaData.attributes : [],
    newTag: "",
    newKey: "",
    newValue: "",
  };

  const goBack = () => history.push(imagePathname || folderPathname + search);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        const { tags, attributes } = values;
        setMetaData({
          variables: {
            id,
            metaDataInput: {
              tags,
              attributes,
            },
          },
        });
        setSubmitting(false);
        goBack();
      }}
    >
      {({ isSubmitting }) => (
        <FlexForm>
          <HeaderContainer>
            <span>
              {__typename === "Folder" ? Characters.folder : Characters.file}
            </span>
            <EntryName>{id.split("/").slice(-1)[0]}</EntryName>
          </HeaderContainer>

          <MetaDataPartialForm
            availableAttributes={availableAttributes}
            availableTags={availableTags}
          />

          <ButtonContainer>
            <SubmitButton type="submit" disabled={isSubmitting}>
              Submit
            </SubmitButton>
            <button type="button" onClick={goBack}>
              Cancel
            </button>
          </ButtonContainer>
        </FlexForm>
      )}
    </Formik>
  );
};

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
