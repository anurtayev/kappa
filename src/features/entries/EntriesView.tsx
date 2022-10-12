import { Card } from "antd";
import { Skeleton } from "antd";

import { AsyncImage } from "features/asyncImage";
import { appRoutes, FolderConnection } from "lib";
import { MouseEventHandler } from "react";
import { MetaLink } from "./MetaLink";
import { Entry, FolderScreenFrame, PaddedSpan } from "./styles";

export type FolderScreenParameters = {
  folders: FolderConnection["folders"];
  files: FolderConnection["files"];
  divRef: React.RefObject<HTMLDivElement>;
  saveNavigate: (dest: string) => void;
};

export const EntriesView = ({
  folders,
  files,
  divRef,
  saveNavigate,
}: FolderScreenParameters) => {
  const onClickSlides =
    (index: number): MouseEventHandler<HTMLDivElement> =>
    (event) => {
      saveNavigate(`${appRoutes.slides}/${String(index)}`);
    };

  const onClickFolder =
    (id: string): MouseEventHandler<HTMLDivElement> =>
    (event) => {
      saveNavigate(`${appRoutes.browse}/${id}`);
    };

  const onClickMetaHof =
    (id: string): MouseEventHandler<HTMLDivElement> =>
    (event) => {
      event.stopPropagation();
      saveNavigate(`${appRoutes.meta}/${id}`);
    };

  return (
    <Card bodyStyle={{ padding: 0, margin: "1rem" }} bordered={false}>
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
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Skeleton.Image />
        </div>
      )}
    </Card>
  );
};
