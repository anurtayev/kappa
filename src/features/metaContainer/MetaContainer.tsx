import { gql, useApolloClient } from "@apollo/client";
import {
  convertMetaDataToInput,
  MetaData,
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

  const [updateMetaDataMutation] = useUpdateMetaDataMutation();

  return (
    <MetaDataInputForm
      id={id}
      metaDataInput={convertMetaDataToInput(metaData)}
      updateMetaDataMutation={updateMetaDataMutation}
      navigate={navigate}
    />
  );
};
