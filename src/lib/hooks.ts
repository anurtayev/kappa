import { createRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useScrollRef(scrollTop: number | undefined) {
  const navigate = useNavigate();
  const { key: locationKey } = useLocation();

  const [divRef] = useState<React.RefObject<HTMLDivElement>>(
    createRef<HTMLDivElement>()
  );

  useEffect(() => {
    divRef.current && scrollTop && divRef.current.scrollTo(0, scrollTop);
  });

  const saveScrollTopAndNavigate = (dest: string | number) => {
    sessionStorage.setItem(
      locationKey,
      JSON.stringify({
        scrollTop: divRef.current?.scrollTop as number,
      })
    );
    if (typeof dest === "number") {
      navigate(dest);
    } else {
      navigate(dest);
    }
  };

  return { divRef, saveScrollTopAndNavigate };
}
