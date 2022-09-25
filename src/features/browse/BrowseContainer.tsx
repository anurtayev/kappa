import {
  LeftOutlined,
  RightOutlined,
  HomeOutlined,
  SearchOutlined,
  UpOutlined,
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
import { useLocation, useParams, useSearchParams } from "react-router-dom";

export const BrowseContainer = () => {
  const { setNavs, setTitle, session, pageSize } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const params = useParams();
  const { pathname, search } = useLocation();

  const id = params["*"];
  if (!id) {
    throw new Error("no folder specified");
  }
  const hasParent = id !== process.env.REACT_APP_MEDIA_ROOT;
  const parentPath = id.split("/").slice(0, -2).join("/") + "/";

  const token = decodeURIComponent(searchParams.get("token") || "");

  useEffect(() => {
    sessionStorage.setItem("slidesReturn", pathname + search);
  }, [pathname, search]);

  useEffect(() => {
    setTitle(getMediaName(id === process.env.REACT_APP_MEDIA_ROOT ? "" : id));
  }, [id, setTitle]);

  const { data, loading, error } = useSlidesQuery({
    variables: {
      pageSize,
      id,
      nextToken: token,
    },
    context: {
      headers: {
        authorization: `Bearer ${session?.getIdToken().getJwtToken()}`,
      },
    },
  });

  const { divRef, navigateSave } = useScrollRef();

  const files = data?.listFolder?.files;
  slides(files);

  const nextToken = data?.listFolder?.nextToken;

  useEffect(() => {
    setNavs([
      <Button
        key="1"
        shape="circle"
        icon={<HomeOutlined />}
        onClick={() => navigateSave("/")}
      />,
      ...(hasParent
        ? [
            <Button
              key="2"
              shape="circle"
              icon={<UpOutlined />}
              onClick={() => navigateSave(parentPath)}
            />,
          ]
        : []),
      ...(token
        ? [
            <Button
              key="3"
              shape="circle"
              icon={<LeftOutlined />}
              onClick={() => navigateSave(-1)}
            />,
          ]
        : []),
      ...(nextToken
        ? [
            <Button
              key="4"
              shape="circle"
              icon={<RightOutlined />}
              onClick={() => {
                sessionStorage.setItem(pathname, token);

                navigateSave(
                  `${appRoutes.browse}/${id}?token=${encodeURIComponent(
                    nextToken
                  )}`
                );
              }}
            />,
          ]
        : []),
      <Button
        key="5"
        shape="circle"
        icon={<SearchOutlined />}
        onClick={() => navigateSave(appRoutes.search)}
      />,
    ]);
  }, [
    nextToken,
    id,
    setNavs,
    navigateSave,
    hasParent,
    parentPath,
    token,
    pathname,
  ]);

  if (loading) return <Loading />;
  if (error) throw error;

  return (
    <EntriesView
      folders={data?.listFolder?.folders}
      files={files}
      divRef={divRef}
      saveNavigate={navigateSave}
    />
  );
};
