import { EntriesView } from "features/entries";
import { Nav } from "features/nav";
import {
  appRoutes,
  Characters,
  getPageSizeFromURLSearchParams,
  NavItem,
  PARAM_NEXT_TOKEN,
  PARAM_PAGE_SIZE,
  PARAM_SEARCH_INPUT,
  SearchInput,
  useScrollRef,
  useSearchQuery,
} from "lib";
import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { SearchInputForm } from "./SearchInputForm";

export const SearchContainer = () => {
  const [searchParams] = useSearchParams();
  const { key: locationKey } = useLocation();

  const pageSize = getPageSizeFromURLSearchParams(searchParams);
  const nextToken = searchParams.get(PARAM_NEXT_TOKEN);
  let searchInputDefaultValue: SearchInput = {
    filter: {},
  };
  const searchInputIdParam = searchParams.get(PARAM_SEARCH_INPUT);
  try {
    if (searchInputIdParam) {
      searchInputDefaultValue = JSON.parse(
        sessionStorage.get(searchInputIdParam)
      );
    }
  } catch (error) {}

  const [searchInput, setSearchInput] = useState<SearchInput>(
    searchInputDefaultValue
  );

  const { data, loading, error } = useSearchQuery({
    variables: {
      searchInput,
      pageSize,
      nextToken,
      locationKey,
    },
  });

  const { divRef, saveScrollTopAndNavigate } = useScrollRef(
    data?.search?.scrollTop
  );

  if (loading) return <p>Loading</p>;
  // if (error) return <p>{error.message}</p>;

  const newNextToken = data?.search?.nextToken;
  const nextPageUrl =
    newNextToken &&
    `/${appRoutes.search}?${PARAM_SEARCH_INPUT}=${locationKey}&${PARAM_NEXT_TOKEN}=${newNextToken}&${PARAM_PAGE_SIZE}=${pageSize}`;
  newNextToken &&
    sessionStorage.setItem(locationKey, JSON.stringify(searchInput));

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
  nextPageUrl &&
    navs.push({
      title: "Next",
      navFn: () => saveScrollTopAndNavigate(nextPageUrl),
      icon: Characters.arrowRight,
    });
  navs.push({
    title: "Search",
    navFn: () => saveScrollTopAndNavigate(`/${appRoutes.search}`),
    icon: Characters.magnifyingGlass,
  });

  return (
    <>
      <Nav navs={navs}></Nav>
      <SearchInputForm
        setSearchInput={setSearchInput}
        searchInput={searchInput}
      />
      <EntriesView
        files={data?.search?.files}
        folders={data?.search?.folders}
        scrollTop={data?.search?.scrollTop}
        nextPageUrl={nextPageUrl}
        divRef={divRef}
        saveScrollTopAndNavigate={saveScrollTopAndNavigate}
      />
    </>
  );
};
