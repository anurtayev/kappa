import { Breadcrumb } from "antd";
import { gql, useApolloClient } from "@apollo/client";
import { Loading } from "features/loading";
import {
  AppContext,
  Maybe,
  MetaData,
  useGetAllTagsAndAttributesQuery,
  useUpdateMetaDataMutation,
} from "lib";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MetaDataInputForm } from "./MetaDataInputForm";
import { useEffect } from "react";

export const MetaContainer = () => {
  const client = useApolloClient();
  const navigate = useNavigate();
  const params = useParams();
  const { session, setTitle } = useContext(AppContext);

  const id = params["*"];
  if (!id) {
    throw new Error("id is missing");
  }

  useEffect(() => {
    setTitle(
      <Breadcrumb>
        {id.split("/").map((el) => (
          <Breadcrumb.Item key={el}>{el}</Breadcrumb.Item>
        ))}
      </Breadcrumb>
    );
  }, [setTitle, id]);

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
    context: {
      headers: {
        authorization: `Bearer ${session?.getIdToken().getJwtToken()}`,
      },
    },
  });

  const [updateMetaDataMutation] = useUpdateMetaDataMutation({
    context: {
      headers: {
        authorization: `Bearer ${session?.getIdToken().getJwtToken()}`,
      },
    },
  });

  if (loading) return <Loading />;
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
