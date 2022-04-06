import React, { useContext } from "react";
import { useMutation, useQuery, gql, useApolloClient } from "@apollo/client";
import { Form, Formik } from "formik";
import {
  useLocation,
  useNavigate,
  useSearchParams,
  NavigateFunction,
} from "react-router-dom";

import {
  Characters,
  useUpdateMetaDataMutation,
  MetaData,
  MetaDataInput,
} from "lib";
import { MetaDataInputForm } from "./MetaDataInputForm";

export const MetaContainer = () => {
  const client = useApolloClient();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname } = useLocation();

  const id = searchParams.get("id");
  if (!id) {
    throw new Error("id is missing");
  }

  const { MetaData: metaData } = client.readQuery({
    query: gql`
      query ReadMetaData($id: String!) {
        MetaData(id: $id) {
          id
          attributes
          tags
        }
      }
    `,
    variables: {
      id,
    },
  });

  const metaDataInput: MetaDataInput = {
    tags: metaData.tags,
    attributes: metaData.attributes,
  };

  const [updateMetaDataMutation, { data, loading, error }] =
    useUpdateMetaDataMutation({
      variables: {
        id,
        metaDataInput,
      },
    });

  if (loading || !data) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  const goBack = () => navigate(-1);

  return (
    <MetaDataInputForm
      id={id}
      metaDataInput={metaDataInput}
      updateMetaDataMutation={updateMetaDataMutation}
      navigate={navigate}
    />
  );
};
