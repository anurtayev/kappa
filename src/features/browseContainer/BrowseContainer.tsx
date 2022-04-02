import React, { useState } from "react";
import {
  useSearchParams,
  useNavigate,
  Link,
  NavigateFunction,
} from "react-router-dom";

import { EntriesView } from "features/entriesView";
import {
  EntryType,
  EntryAction,
  useSlidesQuery,
  appRoutes,
  Characters,
  NavItem,
} from "lib";

/**
 * id
 * nextToken
 * pageSize
 *
 * navigation:
 * home
 * back
 * next
 * search
 *
 * @returns
 */
export const BrowseContainer = () => {
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

  const navs: Array<NavItem> = [
    { title: "Home", navFn: () => navigate("/"), icon: Characters.home },
    { title: "Back", navFn: () => navigate(-1), icon: Characters.arrowLeft },
    {
      title: "Next",
      navFn: () =>
        navigate(
          `/${appRoutes.browse}?id=${id}&nexttoken=${newNextToken}&pagesize=${pageSize}`
        ),
      icon: Characters.arrowRight,
    },
    {
      title: "Search",
      navFn: () => navigate(`/${appRoutes.search}`),
      icon: Characters.magnifyingGlass,
    },
  ];

  return (
    <div
      onClick={({ target }) => {
        if (target instanceof HTMLElement) {
          const key = target.dataset["key"];
          const type = target.dataset["type"];
          const action = target.dataset["action"];

          if (action === EntryAction.navigate) {
            if (type === EntryType.file) {
              navigate(`/${appRoutes.slides}?id=${key}`);
            } else {
              navigate(`/${appRoutes.browse}?id=${key}`);
            }
          } else if (action === EntryAction.meta) {
            navigate(`/${appRoutes.meta}?id=${key}`);
          }
        }
      }}
    >
      {items ? <EntriesView entries={items} navs={navs} /> : "no entries"}
    </div>
  );
};
