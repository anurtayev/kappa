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

  const { slides, folderPathname, search, navRef } = {
    slides: [],
    folderPathname: "",
    search: "",
    navRef: null,
  };

  const entry = { id: "", __typename: "" };

  if (!entry || entry.__typename !== "File") throw new Error("entry not found");

  return (
    <Frame>
      <Image
        src={`${
          process.env.REACT_APP_THUMBOR_URL
        }/unsafe/fit-in/${encodeURIComponent(
          `${process.env.REACT_APP_IMG_CDN_URL_INTERNAL || ""}/${id}`
        )}`}
        alt=""
        onClick={() => navigate(folderPathname + search)}
      />
    </Frame>
  );
};
