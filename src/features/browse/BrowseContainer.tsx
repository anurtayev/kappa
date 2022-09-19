import {
  FastBackwardOutlined,
  FastForwardOutlined,
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
  const { setNavs, setTitle, session } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const params = useParams();
  const { key } = useLocation();

  const id = params["*"] || process.env.REACT_APP_MEDIA_ROOT;
  if (!id) {
    throw new Error("no folder specified");
  }

  const pageSize = Number(
    searchParams.get("pagesize") || process.env.REACT_APP_PAGE_SIZE || "20"
  );
  const returnPathKey = searchParams.get("returnkey") || "";
  const token = decodeURIComponent(searchParams.get("token") || "");

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

  const { divRef, navigateSave, navigate, navigateBackToPath, navigateBack } =
    useScrollRef();

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
      ...(id !== process.env.REACT_APP_MEDIA_ROOT
        ? [
            <Button
              key="2"
              shape="circle"
              icon={<UpOutlined />}
              onClick={() => navigateBackToPath()}
            />,
          ]
        : []),
      ...(token
        ? [
            <Button
              key="3"
              shape="circle"
              icon={<FastBackwardOutlined />}
              onClick={() => navigateBack()}
            />,
          ]
        : []),
      ...(nextToken
        ? [
            <Button
              key="4"
              shape="circle"
              icon={<FastForwardOutlined />}
              onClick={() =>
                navigate(
                  `${appRoutes.browse}/${id}?token=${encodeURIComponent(
                    nextToken
                  )}&pagesize=${pageSize}&returnkey=${returnPathKey}`
                )
              }
            />,
          ]
        : []),
      <Button
        key="5"
        shape="circle"
        icon={<SearchOutlined />}
        onClick={() => navigateSave(`${appRoutes.search}?returnkey=${key}`)}
      />,
    ]);
  }, [nextToken, id, token, pageSize, navigateSave, setNavs, navigate]);

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
