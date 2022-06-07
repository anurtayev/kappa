import { createRef, useEffect, useState } from "react";
import { ImagePane, Image } from "./styles";
import { Skeleton } from "antd";

export type ImageAsyncParams = { id: string };

const frameRef = createRef<HTMLDivElement>();

export const ImageAsync = ({ id }: ImageAsyncParams) => {
  const [measures, setMeasures] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const [isMeasured, setIsMeasured] = useState<boolean>(false);
  const [src, setSrc] = useState<string>("");

  useEffect(() => {
    if (frameRef.current && !isMeasured) {
      setMeasures({
        width: frameRef.current.clientWidth,
        height: frameRef.current.clientHeight,
      });
      setIsMeasured(true);
    }
  }, [isMeasured]);

  useEffect(() => {
    setSrc("");
    isMeasured &&
      fetch(
        `${process.env.REACT_APP_CLOUDFRONT_URL}/resizer?key=${id}&width=${measures.width}&height=${measures.height}`
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
  }, [id, isMeasured, measures.width, measures.height]);

  console.log("==> ren");

  return (
    <ImagePane ref={frameRef}>
      {isMeasured &&
        (src ? (
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
        ))}
    </ImagePane>
  );
};
