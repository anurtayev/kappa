import { useNavigate, useParams } from "react-router-dom";

import { Frame, Image } from "./ImageScreen.styles";

export const ImageScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const { folderPathname, search } = {
    folderPathname: "",
    search: "",
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
