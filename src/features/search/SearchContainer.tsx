import { slides } from "cache";
import { EntriesView } from "features/entries";
import { Loading } from "features/loading";
import { Nav } from "features/nav";
import {
  AppContext,
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
import { useContext, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { SearchInputForm } from "./SearchInputForm";

export const SearchContainer = () => {
  const [searchParams] = useSearchParams();
  const { key: locationKey } = useLocation();
  const { session } = useContext(AppContext);

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

  const { data, loading } = useSearchQuery({
    variables: {
      searchInput,
      pageSize,
      nextToken,
    },
    context: {
      headers: {
        authorization: `Bearer ${session?.getIdToken().getJwtToken()}`,
      },
    },
  });

  const { divRef, navigateForward: saveNavigate, navigate } = useScrollRef();

  if (loading) return <Loading />;
  // if (error) return <p>{error.message}</p>;

  const newNextToken = data?.search?.nextToken;
  const nextPageUrl =
    newNextToken &&
    `${appRoutes.search}?${PARAM_SEARCH_INPUT}=${locationKey}&${PARAM_NEXT_TOKEN}=${newNextToken}&${PARAM_PAGE_SIZE}=${pageSize}`;
  newNextToken &&
    sessionStorage.setItem(locationKey, JSON.stringify(searchInput));
  const files = data?.search?.files;
  slides(files);

  const navs: Array<NavItem> = [
    {
      title: "Home",
      navFn: () => saveNavigate("/"),
      icon: Characters.home,
    },
    {
      title: "Back",
      navFn: () => navigate(-1),
      icon: Characters.arrowLeft,
    },
  ];
  nextPageUrl &&
    navs.push({
      title: "Next",
      navFn: () => saveNavigate(nextPageUrl),
      icon: Characters.arrowRight,
    });
  navs.push({
    title: "Search",
    navFn: () => saveNavigate(`${appRoutes.search}`),
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
        divRef={divRef}
        saveNavigate={saveNavigate}
      />
    </>
  );
};
