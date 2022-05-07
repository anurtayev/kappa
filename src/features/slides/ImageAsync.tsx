import { createRef, useEffect, useState } from "react";
import { ImagePane, Image } from "./styles";

export type ImageAsyncParams = { id: string };

const frameRef = createRef<HTMLDivElement>();

export const ImageAsync = ({ id }: ImageAsyncParams) => {
  const [measures, setMeasures] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const [isMeasured, setIsMeasured] = useState<boolean>(false);

  useEffect(() => {
    if (frameRef.current && !isMeasured) {
      setMeasures({
        width: frameRef.current.clientWidth,
        height: frameRef.current.clientHeight,
      });
      setIsMeasured(true);
    }
  });

  return (
    <ImagePane ref={frameRef}>
      {isMeasured && (
        <Image
          src={`${process.env.REACT_APP_CLOUDFRONT_URL}/resizer?key=${id}&width=${measures.width}&height=${measures.height}`}
          alt=""
        />
      )}
    </ImagePane>
  );
};
