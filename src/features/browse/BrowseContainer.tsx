import {
  FastForwardOutlined,
  HomeOutlined,
  RollbackOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import { slides } from "cache";
import { EntriesView } from "features/entries";
import { Loading } from "features/loading";
import {
  appRoutes,
  getMediaName,
  LayoutContext,
  useScrollRef,
  useSlidesQuery,
} from "lib";
import { useContext, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export const BrowseContainer = () => {
  const { setNavs, setTitle } = useContext(LayoutContext);
  const [searchParams] = useSearchParams();
  const { key: locationKey } = useLocation();

  const id = searchParams.get("id") || process.env.REACT_APP_MEDIA_ROOT || "";
  const pageSize = Number(
    searchParams.get("pagesize") || process.env.REACT_APP_PAGE_SIZE || "20"
  );
  const nextToken = searchParams.get("nexttoken");

  useEffect(() => {
    setTitle(getMediaName(id === process.env.REACT_APP_MEDIA_ROOT ? "" : id));
  }, [id]);

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

  const newNextToken = data?.listFolder?.nextToken;
  const nextPageUrl =
    newNextToken &&
    `/${appRoutes.browse}?id=${id}&nexttoken=${newNextToken}&pagesize=${pageSize}`;
  const files = data?.listFolder?.files;
  slides(files);

  useEffect(() => {
    setNavs([
      <Button
        key={"1"}
        shape="circle"
        icon={<HomeOutlined />}
        onClick={() => saveScrollTopAndNavigate("/")}
      />,
      <Button
        key={"2"}
        shape="circle"
        icon={<RollbackOutlined />}
        onClick={() => saveScrollTopAndNavigate(-1)}
      />,
      ...(nextPageUrl
        ? [
            <Button
              key={"3"}
              shape="circle"
              icon={<FastForwardOutlined />}
              onClick={() => saveScrollTopAndNavigate(nextPageUrl)}
            />,
          ]
        : []),
      <Button
        key={"4"}
        shape="circle"
        icon={<SearchOutlined />}
        onClick={() => saveScrollTopAndNavigate(`/${appRoutes.search}`)}
      />,
    ]);
  }, [nextPageUrl, saveScrollTopAndNavigate, setNavs]);

  if (loading) return <Loading />;
  if (error) throw error;

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
