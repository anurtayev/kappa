import React, { useEffect, createRef, MouseEventHandler } from "react";
import {
  useSearchParams,
  useNavigate,
  useLocation,
  Link,
  NavigateFunction,
  To,
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
  const { key: locationKey } = useLocation();
  const imagesDivRef = createRef<HTMLDivElement>();

  const saveScrollTopAndNavigate = (dest: string | number) => {
    sessionStorage.setItem(
      locationKey,
      JSON.stringify({ scrollTop: imagesDivRef.current?.scrollTop as number })
    );
    if (typeof dest === "number") {
      navigate(dest);
    } else {
      navigate(dest);
    }
  };

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
      locationKey,
    },
  });

  if (loading) return <p>Loading</p>;
  if (error || !data) return <p>Error {JSON.stringify(error)}</p>;

  const items = data.listFolder?.items;
  const scrollTop = data.listFolder?.scrollTop;
  const newNextToken = data.listFolder?.nextToken;

  useEffect(() => {
    imagesDivRef.current &&
      scrollTop &&
      imagesDivRef.current.scrollTo(0, scrollTop);
  }, [scrollTop]);

  const navs: Array<NavItem> = [
    {
      title: "Home",
      navFn: () => saveScrollTopAndNavigate("/"),
      icon: Characters.home,
    },
    {
      title: "Back",
      navFn: () => saveScrollTopAndNavigate(-1),
      icon: Characters.arrowLeft,
    },
  ];
  newNextToken &&
    navs.push({
      title: "Next",
      navFn: () =>
        saveScrollTopAndNavigate(
          `/${appRoutes.browse}?id=${id}&nexttoken=${newNextToken}&pagesize=${pageSize}`
        ),
      icon: Characters.arrowRight,
    });
  navs.push({
    title: "Search",
    navFn: () => saveScrollTopAndNavigate(`/${appRoutes.search}`),
    icon: Characters.magnifyingGlass,
  });

  const onClickMeta: MouseEventHandler = ({ target }) => {
    if (target instanceof HTMLElement) {
      const key = target.dataset["key"];
      saveScrollTopAndNavigate(`/${appRoutes.meta}?id=${key}`);
    }
  };

  const onClickSlides: MouseEventHandler = ({ target }) => {
    if (target instanceof HTMLElement) {
      const key = target.dataset["key"];
      saveScrollTopAndNavigate(`/${appRoutes.slides}?id=${key}`);
    }
  };

  const onClickFolder: MouseEventHandler = ({ target }) => {
    if (target instanceof HTMLElement) {
      const key = target.dataset["key"];
      saveScrollTopAndNavigate(`/${appRoutes.browse}?id=${key}`);
    }
  };

  return items ? (
    <EntriesView
      entries={items}
      navs={navs}
      scrollRef={imagesDivRef}
      onClickMeta={onClickMeta}
      onClickSlides={onClickSlides}
      onClickFolder={onClickFolder}
    />
  ) : (
    "no entries"
  );
};
