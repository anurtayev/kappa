import { appRoutes, FolderConnection, Maybe } from "lib";
import { MouseEventHandler } from "react";
import { MetaLink } from "./MetaLink";
import { Entry, FolderScreenFrame, PaddedSpan, VerticalFrame } from "./styles";

export type FolderScreenParameters = {
  folders: FolderConnection["folders"];
  files: FolderConnection["files"];
  nextPageUrl: Maybe<string> | undefined;
  scrollTop: number | undefined;
  divRef: React.RefObject<HTMLDivElement>;
  saveScrollTopAndNavigate: (dest: string | number) => void;
};

export const EntriesView = ({
  folders,
  files,
  divRef,
  saveScrollTopAndNavigate,
}: FolderScreenParameters) => {
  const onClickSlides =
    (index: number): MouseEventHandler<HTMLDivElement> =>
    (event) => {
      saveScrollTopAndNavigate(`/${appRoutes.slides}?index=${index}`);
    };

  const onClickFolder =
    (id: string): MouseEventHandler<HTMLDivElement> =>
    (event) => {
      saveScrollTopAndNavigate(`/${appRoutes.browse}?id=${id}`);
    };

  const onClickMetaHof =
    (id: string): MouseEventHandler<HTMLDivElement> =>
    (event) => {
      event.stopPropagation();
      saveScrollTopAndNavigate(`/${appRoutes.meta}?id=${id}`);
    };

  return (
    <VerticalFrame>
      {folders || files ? (
        <FolderScreenFrame ref={divRef}>
          {folders?.map(({ id }) => (
            <Entry key={id} onClick={onClickFolder(id)}>
              <PaddedSpan>{id.split("/").slice(1, -1)}</PaddedSpan>
              <MetaLink onClickMeta={onClickMetaHof(id)} />
            </Entry>
          ))}
          {files?.map(({ id }, index) => (
            <Entry key={id} onClick={onClickSlides(index)}>
              <img
                src={`${process.env.REACT_APP_CLOUDFRONT_URL}/resizer?key=${id}&width=${process.env.REACT_APP_ICON_WIDTH}&height=${process.env.REACT_APP_ICON_HEIGHT}`}
                alt=""
              />
              <MetaLink onClickMeta={onClickMetaHof(id)} />
            </Entry>
          ))}
        </FolderScreenFrame>
      ) : (
        <div>no entries</div>
      )}
    </VerticalFrame>
  );
};
