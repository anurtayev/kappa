import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { appRoutes, Characters } from "lib";

import {
  Frame,
  Image,
  LeftSlideButton,
  RightSlideButton,
} from "./ImageScreen.styles";

export const ImageScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { slides, folderPathname, search, navRef } = useContext(StateContext);

  const entry = slides.entries.find((entry) => entry.id === "/" + id);

  if (!entry || entry.__typename !== "File") throw new Error("entry not found");

  return (
    <Frame>
      <Image
        src={`${process.env.REACT_APP_THUMBOR_URL}/unsafe/fit-in/${
          navRef.current?.clientWidth
        }x${
          document.documentElement.clientHeight -
          (navRef.current?.clientHeight || 0)
        }/${encodeURIComponent(
          `${process.env.REACT_APP_IMG_CDN_URL_INTERNAL || ""}/${id}`
        )}`}
        alt=""
        onClick={() => navigate(folderPathname + search)}
      />
      {entry.prev && (
        <LeftSlideButton
          onClick={() => {
            navigate(appRoutes.image + entry.prev);
          }}
        >
          {Characters.arrowLeft}
        </LeftSlideButton>
      )}
      {entry.next && (
        <RightSlideButton
          onClick={() => navigate(appRoutes.image + entry.next)}
        >
          {Characters.arrowRight}
        </RightSlideButton>
      )}
    </Frame>
  );
};
