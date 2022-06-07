import { useApolloClient } from "@apollo/client";
import {
  Characters,
  GetSlideIdDocument,
  GetSlideIdQuery,
  GetSlideIdQueryVariables,
  LayoutContext,
  NavItem,
} from "lib";
import { useContext, useState } from "react";
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

  if (!getSlideIdQueryResult) return <div>what the fuck?</div>;

  const { slideId, numberOfSlides } = getSlideIdQueryResult;

  if (!slideId || !numberOfSlides) return <div>what the fuck 2?</div>;

  const navs: Array<NavItem> = [
    {
      title: "Home",
      navFn: () => navigate("/"),
      icon: Characters.home,
    },
    {
      title: "Back",
      navFn: () => navigate(-1),
      icon: Characters.arrowLeft,
    },
  ];

  const onClickNext: SlideNavFn =
    index < numberOfSlides - 1
      ? () => {
          setIndex(index + 1);
        }
      : undefined;

  const onClickPrev: SlideNavFn =
    index > 0
      ? () => {
          setIndex(index - 1);
        }
      : undefined;

  return (
    <SlideScreen
      id={slideId}
      navs={navs}
      onClickNext={onClickNext}
      onClickPrev={onClickPrev}
    />
  );
};
