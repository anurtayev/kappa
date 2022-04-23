import { slides } from "cache";
import { EntriesView } from "features/entriesView";
import { appRoutes, Characters, NavItem, useSlidesQuery } from "lib";
import { createRef, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

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
  const [searchParams] = useSearchParams();
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

  useEffect(() => {
    imagesDivRef.current &&
      data?.listFolder?.scrollTop &&
      imagesDivRef.current.scrollTo(0, data?.listFolder?.scrollTop);
  });

  if (loading) return <p>Loading</p>;
  if (error || !data) return <p>Error {JSON.stringify(error)}</p>;

  const folders = data.listFolder?.folders;
  const files = data.listFolder?.files;
  slides(files);
  const newNextToken = data.listFolder?.nextToken;

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

  const onClickMeta = (id: string) => {
    saveScrollTopAndNavigate(`/${appRoutes.meta}?id=${id}`);
  };

  const onClickSlides = (index: number) => {
    saveScrollTopAndNavigate(`/${appRoutes.slides}?index=${index}`);
  };

  const onClickFolder = (id: string) => {
    saveScrollTopAndNavigate(`/${appRoutes.browse}?id=${id}`);
  };

  return folders || files ? (
    <EntriesView
      folders={folders}
      files={files}
      navs={navs}
      scrollRef={imagesDivRef}
      onClickMeta={onClickMeta}
      onClickSlides={onClickSlides}
      onClickFolder={onClickFolder}
    />
  ) : (
    <div>no entries</div>
  );
};
