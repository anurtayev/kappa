import { slides } from "cache";
import { EntriesView } from "features/entries";
import { Nav } from "features/nav";
import {
  appRoutes,
  Characters,
  NavItem,
  useScrollRef,
  useSlidesQuery,
} from "lib";
import { useLocation, useSearchParams } from "react-router-dom";

export const BrowseContainer = () => {
  const [searchParams] = useSearchParams();
  const { key: locationKey } = useLocation();

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

  const { divRef, saveScrollTopAndNavigate } = useScrollRef(
    data?.listFolder?.scrollTop
  );

  if (loading) return <p>Loading</p>;
  if (error) throw error;

  const newNextToken = data?.listFolder?.nextToken;
  const nextPageUrl =
    newNextToken &&
    `/${appRoutes.browse}?id=${id}&nexttoken=${newNextToken}&pagesize=${pageSize}`;
  const files = data?.listFolder?.files;
  slides(files);

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
      <EntriesView
        folders={data?.listFolder?.folders}
        files={files}
        nextPageUrl={nextPageUrl}
        scrollTop={data?.listFolder?.scrollTop}
        divRef={divRef}
        saveScrollTopAndNavigate={saveScrollTopAndNavigate}
      />
    </>
  );
};
