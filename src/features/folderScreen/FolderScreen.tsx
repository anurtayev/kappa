import React, { useState } from "react";
import { EntriesView } from "features/entriesView";
import { SlidesQuery, useSlidesQuery } from "lib";

export const FolderScreen = () => {
  const [id, setId] = useState<string>("media/");
  const { data, loading, error } = useSlidesQuery({
    variables: {
      pageSize: 10,
      id,
    },
  });

  if (loading) return <p>Loading</p>;
  if (error || !data) return <p>Error {JSON.stringify(error)}</p>;

  const items = data.listFolder?.items;
  const nextToken = data.listFolder?.nextToken;

  return (
    <div
      onClick={({ target }) => {
        if (target instanceof HTMLElement) {
          const id = target.dataset["key"];
          const isFolder = target.dataset["isfolder"];

          console.log("==> here", id, isFolder);

          isFolder && id && setId(id);
        }
      }}
    >
      {items ? <EntriesView entries={items} /> : "no entries"}
    </div>
  );
};
