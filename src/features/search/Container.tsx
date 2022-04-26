import {
  appRoutes,
  SearchInput,
  useSearchQuery,
  getPageSizeFromURLSearchParams,
  PARAM_SEARCH_INPUT,
  PARAM_PAGE_SIZE,
  PARAM_NEXT_TOKEN,
} from "lib";
import { useLocation, useSearchParams } from "react-router-dom";
import { SearchInputForm } from "./MetaDataInputForm";
import { EntriesView } from "features/entriesView";
import { useState } from "react";

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

  const [searchInput, setSearchInput] = useState(searchInputDefaultValue);

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

  const onSubmitSearchInput = (searchInput: SearchInput): void => {
    setSearchInput(searchInput);
  };
  const newNextToken = data?.search?.nextToken;
  let nextPageUrl;
  if (newNextToken) {
    sessionStorage.setItem(locationKey, JSON.stringify(searchInput));
    nextPageUrl = `/${appRoutes.search}?${PARAM_SEARCH_INPUT}=${locationKey}&${PARAM_NEXT_TOKEN}=${newNextToken}&${PARAM_PAGE_SIZE}=${pageSize}`;
  }

  return (
    <>
      <SearchInputForm onSubmitSearchInput={onSubmitSearchInput} />;
      <EntriesView
        files={data?.search?.files}
        folders={data?.search?.folders}
        scrollTop={data?.search?.scrollTop}
        nextPageUrl={nextPageUrl}
      />
    </>
  );
};
