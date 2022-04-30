import { Nav } from "features/nav";
import { appRoutes, Characters, FolderConnection, NavItem, Maybe } from "lib";
import { createRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { File } from "./File";
import { Folder } from "./Folder";
import { FolderScreenFrame, VerticalFrame } from "./styles";

const imagesDivRef = createRef<HTMLDivElement>();

export type FolderScreenParameters = {
  folders: FolderConnection["folders"];
  files: FolderConnection["files"];
  nextPageUrl: Maybe<string> | undefined;
  scrollTop: number | undefined;
};

export const EntriesView = ({
  folders,
  files,
  nextPageUrl,
  scrollTop,
}: FolderScreenParameters) => {
  const navigate = useNavigate();
  const { key: locationKey } = useLocation();

  useEffect(() => {
    imagesDivRef.current &&
      scrollTop &&
      imagesDivRef.current.scrollTo(0, scrollTop);
  });

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

  const onClickMeta = (id: string) => {
    saveScrollTopAndNavigate(`/${appRoutes.meta}?id=${id}`);
  };

  const onClickSlides = (index: number) => {
    saveScrollTopAndNavigate(`/${appRoutes.slides}?index=${index}`);
  };

  const onClickFolder = (id: string) => {
    saveScrollTopAndNavigate(`/${appRoutes.browse}?id=${id}`);
  };

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
    <VerticalFrame>
      <Nav navs={navs}></Nav>
      {folders || files ? (
        <FolderScreenFrame ref={imagesDivRef}>
          {folders?.map((entry) => (
            <Folder
              key={entry.id}
              entry={entry}
              onClickFolder={() => onClickFolder(entry.id)}
              onClickMeta={() => onClickMeta(entry.id)}
            />
          ))}
          {files?.map((entry, index) => (
            <File
              key={entry.id}
              entry={entry}
              onClickSlides={() => onClickSlides(index)}
              onClickMeta={() => onClickMeta(entry.id)}
            />
          ))}
        </FolderScreenFrame>
      ) : (
        <div>no entries</div>
      )}
    </VerticalFrame>
  );
};
