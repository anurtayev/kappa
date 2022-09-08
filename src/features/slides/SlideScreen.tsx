import { createRef, useEffect, useState } from "react";
import { ImagePane } from "./styles";
import { AsyncImage } from "features/asyncImage2";
import { Frame } from "./styles";

export type SlideScreenParams = {
  id: string;
};

export const SlideScreen = ({ id }: SlideScreenParams) => {
  const frameRef = createRef<HTMLDivElement>();
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
  }, [isMeasured, frameRef]);

  return (
    <Frame>
      <ImagePane ref={frameRef}>
        {isMeasured && (
          <AsyncImage id={id} width={measures.width} height={measures.height} />
        )}
      </ImagePane>
    </Frame>
  );
};
export type SlideNavFn = (() => void) | undefined;
