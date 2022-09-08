import { createRef, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export function useScrollRef() {
  const { key: locationKey } = useLocation();

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
      navigate(dest);
    };
  }, [locationKey, navigate, divRef]);

  return {
    divRef,
    saveScrollTopAndNavigate,
    navigate,
    goBack,
  };
}
