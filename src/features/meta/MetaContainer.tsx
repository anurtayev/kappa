import { gql, useApolloClient } from "@apollo/client";
import {
  MetaData,
  useGetAllTagsAndAttributesQuery,
  useUpdateMetaDataMutation,
  Maybe,
} from "lib";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MetaDataInputForm } from "./MetaDataInputForm";

export const MetaContainer = () => {
  const client = useApolloClient();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");
  if (!id) {
    throw new Error("id is missing");
  }

  const metaData: Maybe<MetaData> = client.readFragment({
    id: `MetaData:${id}`,
    fragment: gql`
      fragment ReadMetaData on MetaData {
        id
        attributes
        tags
      }
    `,
  });

  const { data, loading, error } = useGetAllTagsAndAttributesQuery({
    fetchPolicy: "cache-and-network",
  });

  const [updateMetaDataMutation] = useUpdateMetaDataMutation();

  if (loading) return <div>Loading available metadata...</div>;
  if (error) throw error;

  const availableAttributes = data?.attributes;
  const availableTags = data?.tags;

  return (
    <MetaDataInputForm
      id={id}
      metaData={metaData}
      updateMetaDataMutation={updateMetaDataMutation}
      navigate={navigate}
      availableAttributes={availableAttributes}
      availableTags={availableTags}
    />
  );
};
