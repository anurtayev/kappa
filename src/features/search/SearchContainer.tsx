import { EntriesView } from "features/entriesView";
import {
  appRoutes,
  getPageSizeFromURLSearchParams,
  PARAM_NEXT_TOKEN,
  PARAM_PAGE_SIZE,
  PARAM_SEARCH_INPUT,
  SearchInput,
  useSearchQuery,
} from "lib";
import { useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { SearchInputForm } from "./SearchInputForm";

export const Container = () => {
  const [searchParams] = useSearchParams();
  const { key: locationKey } = useLocation();

  const pageSize = getPageSizeFromURLSearchParams(searchParams);
  const nextToken = searchParams.get(PARAM_NEXT_TOKEN);
  let searchInputDefaultValue;
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

  if (loading) return <p>Loading</p>;
  if (error) return <p>{error}</p>;

  const newNextToken = data?.search?.nextToken;
  let nextPageUrl;
  if (newNextToken) {
    sessionStorage.setItem(locationKey, JSON.stringify(searchInput));
    nextPageUrl = `/${appRoutes.search}?${PARAM_SEARCH_INPUT}=${locationKey}&${PARAM_NEXT_TOKEN}=${newNextToken}&${PARAM_PAGE_SIZE}=${pageSize}`;
  }

  return (
    <>
      <SearchInputForm setSearchInput={setSearchInput} />;
      <EntriesView
        files={data?.search?.files}
        folders={data?.search?.folders}
        scrollTop={data?.search?.scrollTop}
        nextPageUrl={nextPageUrl}
      />
    </>
  );
};
