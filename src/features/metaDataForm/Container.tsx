import { useGetAllTagsAndAttributesQuery } from "lib";
import { MetaDataPartialForm } from "./MetaDataPartialForm";

export const Container = () => {
  const { data, loading, error } = useGetAllTagsAndAttributesQuery({
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <div>Loading available metadata...</div>;
  if (error) throw error;

  return (
    <MetaDataPartialForm
      availableAttributes={data?.attributes}
      availableTags={data?.tags}
    />
  );
};
