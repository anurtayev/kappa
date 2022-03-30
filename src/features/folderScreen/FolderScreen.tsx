import React from "react";
import { EntriesView } from "features/entriesView";
import { SlidesQuery, useSlidesQuery } from "lib";

export const FolderScreen = () => {
  const { data, loading, error } = useSlidesQuery({
    variables: {
      pageSize: 10,
    },
  });

  if (loading) return <p>Loading</p>;
  if (error || !data) return <p>Error</p>;

  const items = data.listFolder?.items;
  const nextToken = data.listFolder?.nextToken;

  return <div>{items ? <EntriesView entries={items} /> : "no entries"}</div>;
};
