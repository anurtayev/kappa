import { Skeleton } from "antd";
import { AppContext } from "lib";
import { useContext, useEffect, useState } from "react";
import { Image } from "./styles";

export type ImageAsyncParams = { id: string; width: number; height: number };

export const AsyncImage = ({ id, width, height }: ImageAsyncParams) => {
  const { session } = useContext(AppContext);
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    setSrc("");
    fetch(
      `${process.env.REACT_APP_CLOUDFRONT_URL}/resizer?key=${id}&width=${width}&height=${height}`,
      {
        headers: {
          authorization: `Bearer ${session?.getIdToken().getJwtToken()}`,
        },
      }
    )
      .then((response) => {
        const reader = response.body?.getReader();
        return new ReadableStream({
          start(controller) {
            return pump();
            function pump(): any {
              return reader?.read().then(({ done, value }) => {
                if (done) {
                  controller.close();
                  return;
                }
                controller.enqueue(value);
                return pump();
              });
            }
          },
        });
      })
      .then((stream) => new Response(stream))
      .then((response) => response.blob())
      .then((blob) => URL.createObjectURL(blob))
      .then((url) => setSrc(url))
      .catch((err) => console.error(err));
  }, [id, width, height, session]);

  return src ? (
    <Image alt="" src={src} />
  ) : (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Skeleton.Image />
    </div>
  );
};
