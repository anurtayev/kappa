import {
  HomeOutlined,
  RollbackOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
} from "@ant-design/icons";
import { useApolloClient } from "@apollo/client";
import { Button } from "antd";
import {
  Characters,
  GetSlideIdDocument,
  GetSlideIdQuery,
  GetSlideIdQueryVariables,
  LayoutContext,
  NavItem,
} from "lib";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { URLSearchParams } from "url";
import { SlideNavFn, SlideScreen } from "./SlideScreen";

const getIndexFromParams = (params: URLSearchParams): number => {
  try {
    return Number(params.get("index")) || 0;
  } catch (error) {
    return 0;
  }
};
export type SlidesContainerParams = {};

export const SlidesContainer = () => {
  const { setNavs } = useContext(LayoutContext);
  const client = useApolloClient();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [index, setIndex] = useState(getIndexFromParams(searchParams));

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
              onClick={() => setIndex(index - 1)}
            />,
          ]
        : []),
      ...(numberOfSlides && index < numberOfSlides - 1
        ? [
            <Button
              key={"4"}
              shape="circle"
              icon={<StepForwardOutlined />}
              onClick={() => setIndex(index + 1)}
            />,
          ]
        : []),
    ]);
  }, [index]);

  if (!slideId) throw Error("Slides: no id");

  console.log("==> ", slideId, index);

  return <SlideScreen id={slideId} />;
};
