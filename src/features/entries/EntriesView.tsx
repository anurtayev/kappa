import { appRoutes, FolderConnection, Maybe } from "lib";
import { File } from "./File";
import { Folder } from "./Folder";
import { FolderScreenFrame, VerticalFrame } from "./styles";

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
  const onClickMeta = (id: string) => {
    saveScrollTopAndNavigate(`/${appRoutes.meta}?id=${id}`);
  };

  const onClickSlides = (index: number) => {
    saveScrollTopAndNavigate(`/${appRoutes.slides}?index=${index}`);
  };

  const onClickFolder = (id: string) => {
    saveScrollTopAndNavigate(`/${appRoutes.browse}?id=${id}`);
  };

  return (
    <VerticalFrame>
      {folders || files ? (
        <FolderScreenFrame ref={divRef}>
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
