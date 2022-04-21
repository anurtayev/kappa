import { gql, useApolloClient } from "@apollo/client";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  useUpdateMetaDataMutation,
  useGetAllTagsAndAttributesQuery,
  convertMetaDataToInput,
  MetaData,
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

  const [updateMetaDataMutation] = useUpdateMetaDataMutation();

  const { data, loading, error } = useGetAllTagsAndAttributesQuery({
    fetchPolicy: "cache-and-network",
  });

  if (loading || !data) return <p>Loading</p>;
  if (error) return <p>Error</p>;

  return (
    <MetaDataInputForm
      id={id}
      metaDataInput={convertMetaDataToInput(metaData)}
      updateMetaDataMutation={updateMetaDataMutation}
      navigate={navigate}
      availableMetaData={data}
    />
  );
};
