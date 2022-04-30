import { slides } from "cache";
import { EntriesView } from "features/entries";
import { appRoutes, useSlidesQuery } from "lib";
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

  if (loading) return <p>Loading</p>;
  if (error) throw error;

  const newNextToken = data?.listFolder?.nextToken;
  const files = data?.listFolder?.files;
  slides(files);

  return (
    <EntriesView
      folders={data?.listFolder?.folders}
      files={files}
      nextPageUrl={
        newNextToken &&
        `/${appRoutes.browse}?id=${id}&nexttoken=${newNextToken}&pagesize=${pageSize}`
      }
      scrollTop={data?.listFolder?.scrollTop}
    />
  );
};
