import React, { useState } from "react";
import {
  useSearchParams,
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";

import { EntriesView } from "features/entriesView";
import { SlidesQuery, useSlidesQuery } from "lib";

/**
 * id
 * nextToken
 * pageSize
 *
 * navigation:
 * home
 * back
 * next         !
 * folderMeta
 * fileMeta
 * slides
 * search
 *
 * @returns
 */
export const FolderScreen = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const id = searchParams.get("id") || process.env.REACT_APP_MEDIA_ROOT || "";
  const pageSize = Number(
    searchParams.get("pagesize") || process.env.REACT_APP_PAGE_SIZE || "20"
  );
  const nextToken = searchParams.get("nexttoken");

  const { data, loading, error } = useSlidesQuery({
    variables: {
      pageSize,
      id,
      nextToken,
    },
  });

  if (loading) return <p>Loading</p>;
  if (error || !data) return <p>Error {JSON.stringify(error)}</p>;

  const items = data.listFolder?.items;
  const newNextToken = data.listFolder?.nextToken;

  return (
    <div
      onClick={({ target }) => {
        if (target instanceof HTMLElement) {
          const id = target.dataset["key"];
          const isFolder = target.dataset["isfolder"];

          console.log("==> here", id, isFolder);

          // isFolder && id && setId(id);
        }
      }}
    >
      {items ? <EntriesView entries={items} /> : "no entries"}
    </div>
  );
};
