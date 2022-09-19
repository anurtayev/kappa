import {
  UpOutlined,
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
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import { SlideScreen } from "./SlideScreen";

export const SlidesContainer = () => {
  const { setNavs, setTitle } = useContext(AppContext);
  const [searchParams] = useSearchParams();
  const client = useApolloClient();
  const { id } = useParams();
  const index = Number(id) || 0;
  const returnPathKey = searchParams.get("returnkey") || "";
  const { key } = useLocation();

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

  const { divRef, navigateSave, navigate, navigateBackToPath, navigateBack } =
    useScrollRef();

  useEffect(() => {
    slideId && setTitle(getMediaName(slideId));
  }, [slideId, setTitle]);

  useEffect(() => {
    setNavs([
      <Button
        key="1"
        shape="circle"
        icon={<HomeOutlined />}
        onClick={() => navigateSave("/")}
      />,
      <Button
        key="5"
        shape="circle"
        icon={<UpOutlined />}
        onClick={() => navigateBackToPath()}
      />,
      ...(index > 0
        ? [
            <Button
              key="3"
              shape="circle"
              icon={<StepBackwardOutlined />}
              onClick={() => navigateBack()}
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
                navigate(
                  `${appRoutes.slides}/${String(
                    index + 1
                  )}?returnkey=${returnPathKey}`
                );
              }}
            />,
          ]
        : []),
    ]);
  }, [index, navigate, numberOfSlides, setNavs, navigateSave]);

  if (!slideId) throw Error("Slides: no id");

  return <SlideScreen id={slideId} />;
};
