import { gql, useApolloClient } from "@apollo/client";
import {
  convertMetaDataToInput,
  MetaData,
  useGetAllTagsAndAttributesQuery,
  useUpdateMetaDataMutation,
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

  const metaData: MetaData | null = client.readFragment({
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

  if (loading) return <div>Loading available metadata...</div>;
  if (error) throw error;

  const [updateMetaDataMutation] = useUpdateMetaDataMutation();

  const availableAttributes = data?.attributes;
  const availableTags = data?.tags;

  return (
    <MetaDataInputForm
      id={id}
      metaDataInput={convertMetaDataToInput(metaData)}
      updateMetaDataMutation={updateMetaDataMutation}
      navigate={navigate}
      availableAttributes={availableAttributes}
      availableTags={availableTags}
    />
  );
};
