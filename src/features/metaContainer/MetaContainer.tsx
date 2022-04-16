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

  const [updateMetaDataMutation] = useUpdateMetaDataMutation({
    update(cache, mutationResult) {
      const { tags, attributes, id } =
        mutationResult?.data?.updateMetaData || {};

      console.log(
        "==>",
        JSON.stringify(mutationResult?.data?.updateMetaData, null, 2)
      );

      // cache.modify({
      //   fields: {
      //     todos(existingTodos = []) {
      //       const newTodoRef = cache.writeFragment({
      //         data: addTodo,
      //         fragment: gql`
      //           fragment NewTodo on Todo {
      //             id
      //             type
      //           }
      //         `,
      //       });
      //       return [...existingTodos, newTodoRef];
      //     },
      //   },
      // });
    },
  });

  const {
    data: availableMetaData,
    loading: availableMetaDataLoading,
    error: availableMetaDataError,
  } = useGetAllTagsAndAttributesQuery();

  if (availableMetaDataLoading || !availableMetaData) return <p>Loading</p>;
  if (availableMetaDataError) return <p>Error</p>;

  return (
    <MetaDataInputForm
      id={id}
      metaDataInput={convertMetaDataToInput(metaData)}
      updateMetaDataMutation={updateMetaDataMutation}
      navigate={navigate}
      availableMetaData={availableMetaData}
    />
  );
};
