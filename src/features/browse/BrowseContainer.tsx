import {
  FastBackwardOutlined,
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
  AppContext,
  appRoutes,
  getMediaName,
  useScrollRef,
  useSlidesQuery,
} from "lib";
import { useContext, useEffect } from "react";
import { useLocation, useSearchParams } from "react-router-dom";

export const BrowseContainer = () => {
  const { setNavs, setTitle, session } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const { key: locationKey } = useLocation();

  const id = searchParams.get("id") || process.env.REACT_APP_MEDIA_ROOT || "";
  const pageSize = Number(
    searchParams.get("pagesize") || process.env.REACT_APP_PAGE_SIZE || "20"
  );
  const encodedToken = searchParams.get("token");
  const token = encodedToken ? decodeURIComponent(encodedToken) : encodedToken;

  useEffect(() => {
    setTitle(getMediaName(id === process.env.REACT_APP_MEDIA_ROOT ? "" : id));
  }, [id, setTitle]);

  const { data, loading, error } = useSlidesQuery({
    variables: {
      pageSize,
      id,
      nextToken: token,
      locationKey,
    },
    context: {
      headers: {
        authorization: `Bearer ${session?.getIdToken().getJwtToken()}`,
      },
    },
  });

  const { divRef, saveScrollTopAndNavigate, navigate } = useScrollRef(
    data?.listFolder?.scrollTop
  );

  const files = data?.listFolder?.files;
  slides(files);

  const nextToken = data?.listFolder?.nextToken;

  useEffect(() => {
    // previous page token for next page
    // 1st page has no token
    nextToken &&
      token &&
      nextToken !== token &&
      sessionStorage.setItem(id + nextToken, token);

    const prevToken = token ? sessionStorage.getItem(id + token) : token;

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
        onClick={() => navigate(-1)}
      />,
      ...(token
        ? [
            <Button
              key={"3"}
              shape="circle"
              icon={<FastBackwardOutlined />}
              onClick={() =>
                saveScrollTopAndNavigate(
                  `${appRoutes.browse}?id=${id}&pagesize=${pageSize}${
                    prevToken ? `&token=${encodeURIComponent(prevToken)}` : ""
                  }`
                )
              }
            />,
          ]
        : []),

      ...(nextToken
        ? [
            <Button
              key={"4"}
              shape="circle"
              icon={<FastForwardOutlined />}
              onClick={() =>
                saveScrollTopAndNavigate(
                  `${appRoutes.browse}?id=${id}&token=${encodeURIComponent(
                    nextToken
                  )}&pagesize=${pageSize}`
                )
              }
            />,
          ]
        : []),
      <Button
        key={"5"}
        shape="circle"
        icon={<SearchOutlined />}
        onClick={() => saveScrollTopAndNavigate(appRoutes.search)}
      />,
    ]);
  }, [
    nextToken,
    saveScrollTopAndNavigate,
    setNavs,
    id,
    token,
    pageSize,
    navigate,
  ]);

  if (loading) return <Loading />;
  if (error) throw error;

  return (
    <EntriesView
      folders={data?.listFolder?.folders}
      files={files}
      scrollTop={data?.listFolder?.scrollTop}
      divRef={divRef}
      saveScrollTopAndNavigate={saveScrollTopAndNavigate}
    />
  );
};
