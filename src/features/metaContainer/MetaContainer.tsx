import { gql, useApolloClient } from "@apollo/client";
import { useNavigate, useSearchParams } from "react-router-dom";

import {
  useUpdateMetaDataMutation,
  useGetAllTagsAndAttributesQuery,
  MetaDataInput,
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

  const [
    updateMetaDataMutation,
    { data: updateData, loading: updateLoading, error: updateError },
  ] = useUpdateMetaDataMutation({
    variables: {
      id,
      metaDataInput,
    },
  });

  const {
    data: tagsAndAttributesData,
    loading: tagsAndAttributesLoading,
    error: tagsAndAttributesError,
  } = useGetAllTagsAndAttributesQuery();

  if (tagsAndAttributesLoading || !tagsAndAttributesData) return <p>Loading</p>;
  if (tagsAndAttributesError) return <p>Error</p>;

  const { getAttributes: availableAttributes, getTags: availableTags } =
    tagsAndAttributesData;

  return (
    <MetaDataInputForm
      id={id}
      metaDataInput={metaDataInput}
      updateMetaDataMutation={updateMetaDataMutation}
      navigate={navigate}
      availableAttributes={availableAttributes}
      availableTags={availableTags}
    />
  );
};
