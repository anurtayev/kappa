import { createRef, useEffect, useMemo, useState } from "react";
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

  const saveScrollTopAndNavigate = useMemo(() => {
    return (dest: string) => {
      sessionStorage.setItem(
        locationKey,
        JSON.stringify({
          scrollTop: divRef.current?.scrollTop as number,
        })
      );
      navigate(dest);
    };
  }, [locationKey, navigate, divRef]);

  return { divRef, saveScrollTopAndNavigate, navigate };
}
