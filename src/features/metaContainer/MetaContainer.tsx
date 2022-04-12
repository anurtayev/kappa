import { gql, useApolloClient } from "@apollo/client";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  useUpdateMetaDataMutation,
  useGetAllTagsAndAttributesQuery,
} from "lib";
import { MetaDataInputForm } from "./MetaDataInputForm";

export const MetaContainer = () => {
  const client = useApolloClient();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");
  if (!id) {
    throw new Error("id is missing");
  }

  const metaData = client.readFragment({
    id: `MetaData:${id}`,
    fragment: gql`
      fragment ReadMetaData on MetaData {
        id
        attributes
        tags
      }
    `,
  });

  const [
    updateMetaDataMutation,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useUpdateMetaDataMutation();

  const {
    data: availableMetaData,
    loading: availableMetaDataLoading,
    error: availableMetaDataError,
  } = useGetAllTagsAndAttributesQuery();

  if (availableMetaDataLoading || !availableMetaData) return <p>Loading</p>;
  if (availableMetaDataError) return <p>Error</p>;

  return (
    <MetaDataInputForm
      metaData={metaData}
      updateMetaDataMutation={updateMetaDataMutation}
      navigate={navigate}
      availableMetaData={availableMetaData}
    />
  );
};
