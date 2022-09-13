import { createRef, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useScrollRef() {
  const { key: locationKey, pathname, search } = useLocation();

  const navigate = useNavigate();
  const goBack = useMemo(() => () => navigate(-1), [navigate]);

  const [divRef] = useState<React.RefObject<HTMLDivElement>>(
    createRef<HTMLDivElement>()
  );

  useEffect(() => {
    const scrollTop = sessionStorage.getItem(locationKey);
    divRef.current && divRef.current.scrollTo(0, Number(scrollTop));
  });

  const saveScrollTopAndNavigate = useMemo(() => {
    return (dest: string) => {
      sessionStorage.setItem(
        locationKey,
        String(divRef.current?.scrollTop || 0)
      );
      sessionStorage.setItem("lastFolder", pathname + search);
      console.log("==> saved", pathname + search);

      navigate(dest);
    };
  }, [locationKey, navigate, divRef, pathname, search]);

  return {
    divRef,
    saveScrollTopAndNavigate,
    navigate,
    goBack,
  };
}
