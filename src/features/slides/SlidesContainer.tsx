import {
  CloseOutlined,
  HomeOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
} from "@ant-design/icons";
import { useApolloClient } from "@apollo/client";
import { Button } from "antd";
import {
  AppContext,
  appRoutes,
  GetSlideIdDocument,
  GetSlideIdQuery,
  GetSlideIdQueryVariables,
  useScrollRef,
} from "lib";
import { getMediaName } from "lib/util";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { SlideScreen } from "./SlideScreen";

export const SlidesContainer = () => {
  const { setNavs, setTitle } = useContext(AppContext);
  const client = useApolloClient();
  const { id } = useParams();
  const index = Number(id) || 0;

  const getSlideIdQueryResult = client.readQuery<
    GetSlideIdQuery,
    GetSlideIdQueryVariables
  >({
    query: GetSlideIdDocument,
    variables: {
      index,
    },
  });

  const slideId = getSlideIdQueryResult?.slideId;
  const numberOfSlides = getSlideIdQueryResult?.numberOfSlides;

  const { saveScrollTopAndNavigate, navigate } = useScrollRef();

  useEffect(() => {
    slideId && setTitle(getMediaName(slideId));
  }, [slideId, setTitle]);

  useEffect(() => {
    setNavs([
      <Button
        key="1"
        shape="circle"
        icon={<HomeOutlined />}
        onClick={() => saveScrollTopAndNavigate("/")}
      />,
      ...(index > 0
        ? [
            <Button
              key="3"
              shape="circle"
              icon={<StepBackwardOutlined />}
              onClick={() => {
                navigate(`${appRoutes.slides}/${String(index - 1)}`);
              }}
            />,
          ]
        : []),
      ...(numberOfSlides && index < numberOfSlides - 1
        ? [
            <Button
              key="4"
              shape="circle"
              icon={<StepForwardOutlined />}
              onClick={() => {
                navigate(`${appRoutes.slides}/${String(index + 1)}`);
              }}
            />,
          ]
        : []),
      <Button
        key="5"
        shape="circle"
        icon={<CloseOutlined />}
        onClick={() => {
          const lastFolder = sessionStorage.getItem("lastFolder");
          lastFolder && navigate(lastFolder);
        }}
      />,
    ]);
  }, [index, navigate, numberOfSlides, setNavs, saveScrollTopAndNavigate]);

  if (!slideId) throw Error("Slides: no id");

  return <SlideScreen id={slideId} />;
};
