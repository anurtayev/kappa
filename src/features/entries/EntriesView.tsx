import { AsyncImage } from "features/asyncImage2";
import { appRoutes, FolderConnection } from "lib";
import { MouseEventHandler } from "react";
import { MetaLink } from "./MetaLink";
import { Entry, FolderScreenFrame, PaddedSpan, VerticalFrame } from "./styles";

export type FolderScreenParameters = {
  folders: FolderConnection["folders"];
  files: FolderConnection["files"];
  scrollTop: number | undefined;
  divRef: React.RefObject<HTMLDivElement>;
  saveScrollTopAndNavigate: (dest: string) => void;
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
      saveScrollTopAndNavigate(`${appRoutes.slides}/${String(index)}`);
    };

  const onClickFolder =
    (id: string): MouseEventHandler<HTMLDivElement> =>
    (event) => {
      saveScrollTopAndNavigate(`${appRoutes.browse}?id=${id}`);
    };

  const onClickMetaHof =
    (id: string): MouseEventHandler<HTMLDivElement> =>
    (event) => {
      event.stopPropagation();
      saveScrollTopAndNavigate(`${appRoutes.meta}?id=${id}`);
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
              <AsyncImage
                id={id}
                width={Number(process.env.REACT_APP_ICON_WIDTH || 0)}
                height={Number(process.env.REACT_APP_ICON_HEIGHT || 0)}
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
