import {
  HomeOutlined,
  RollbackOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
} from "@ant-design/icons";
import { useApolloClient } from "@apollo/client";
import { Button } from "antd";
import {
  GetSlideIdDocument,
  GetSlideIdQuery,
  GetSlideIdQueryVariables,
  AppContext,
  appRoutes,
} from "lib";
import { getMediaName } from "lib/util";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { SlideScreen } from "./SlideScreen";

export const SlidesContainer = () => {
  const { setNavs, setTitle } = useContext(AppContext);
  const client = useApolloClient();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [index, setIndex] = useState(Number(searchParams.get("index")));

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

  useEffect(() => {
    slideId && setTitle(getMediaName(slideId));
  }, [slideId, setTitle]);

  useEffect(() => {
    navigate(`${appRoutes.slides}?index=${index}`);
  }, [index, navigate]);

  useEffect(() => {
    setNavs([
      <Button
        key={"1"}
        shape="circle"
        icon={<HomeOutlined />}
        onClick={() => navigate("/")}
      />,
      <Button
        key={"2"}
        shape="circle"
        icon={<RollbackOutlined />}
        onClick={() => navigate(-1)}
      />,
      ...(index > 0
        ? [
            <Button
              key={"3"}
              shape="circle"
              icon={<StepBackwardOutlined />}
              onClick={() => {
                setIndex(index - 1);
              }}
            />,
          ]
        : []),
      ...(numberOfSlides && index < numberOfSlides - 1
        ? [
            <Button
              key={"4"}
              shape="circle"
              icon={<StepForwardOutlined />}
              onClick={() => {
                setIndex(index + 1);
              }}
            />,
          ]
        : []),
    ]);
  }, [index, navigate, numberOfSlides, setNavs, setIndex]);

  if (!slideId) throw Error("Slides: no id");

  return <SlideScreen id={slideId} />;
};
