import {
  FastForwardOutlined,
  HomeOutlined,
  RollbackOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { slides } from "cache";
import { EntriesView } from "features/entries";
import { appRoutes, LayoutContext, useScrollRef, useSlidesQuery } from "lib";
import { useContext } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export const BrowseContainer = () => {
  const { setNavs } = useContext(LayoutContext);
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

  setNavs([
    <Button
      shape="circle"
      icon={<HomeOutlined />}
      onClick={() => saveScrollTopAndNavigate("/")}
    />,
    <Button
      shape="circle"
      icon={<RollbackOutlined />}
      onClick={() => saveScrollTopAndNavigate(-1)}
    />,
    ...(nextPageUrl
      ? [
          <Button
            shape="circle"
            icon={<FastForwardOutlined />}
            onClick={() => saveScrollTopAndNavigate(nextPageUrl)}
          />,
        ]
      : []),
    <Button
      shape="circle"
      icon={<SearchOutlined />}
      onClick={() => saveScrollTopAndNavigate(`/${appRoutes.search}`)}
    />,
  ]);

  return (
    <EntriesView
      folders={data?.listFolder?.folders}
      files={files}
      nextPageUrl={nextPageUrl}
      scrollTop={data?.listFolder?.scrollTop}
      divRef={divRef}
      saveScrollTopAndNavigate={saveScrollTopAndNavigate}
    />
  );
};
