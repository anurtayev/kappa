import { AsyncImage } from "features/asyncImage";
import { appRoutes, FolderConnection } from "lib";
import { MouseEventHandler } from "react";
import { MetaLink } from "./MetaLink";
import { Entry, FolderScreenFrame, PaddedSpan, VerticalFrame } from "./styles";
import { useLocation, useNavigate } from "react-router-dom";

export type FolderScreenParameters = {
  folders: FolderConnection["folders"];
  files: FolderConnection["files"];
};

export const EntriesView = ({ folders, files }: FolderScreenParameters) => {
  const navigate = useNavigate();
  const onClickSlides =
    (index: number): MouseEventHandler<HTMLDivElement> =>
    (event) => {
      navigate(`${appRoutes.slides}/${String(index)}`);
    };

  const onClickFolder =
    (id: string): MouseEventHandler<HTMLDivElement> =>
    (event) => {
      navigate(`${appRoutes.browse}/${id}`);
    };

  const onClickMetaHof =
    (id: string): MouseEventHandler<HTMLDivElement> =>
    (event) => {
      event.stopPropagation();
      navigate(`${appRoutes.meta}/${id}`);
    };

  return (
    <VerticalFrame>
      {folders || files ? (
        <FolderScreenFrame>
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
