import { createRef, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

type LocationState = {
  pathname: string;
  scrollTop: number;
  search: string;
};

export function useScrollRef() {
  const { key, pathname, search, state } = useLocation();
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const navigateBack = useMemo(() => () => navigate(-1), [navigate]);

  const navigateBackToPath = useMemo(
    () => () => {
      const { scrollTop, pathname, search } = state as LocationState;
      navigate(
        pathname + search
          ? search + "&scrollTop=" + String(scrollTop)
          : "?scrollTop=" + String(scrollTop)
      );
    },
    [navigate]
  );

  const [divRef] = useState<React.RefObject<HTMLDivElement>>(
    createRef<HTMLDivElement>()
  );

  useEffect(() => {
    const scrollTop = searchParams.get("scrollTop");
    divRef.current &&
      scrollTop &&
      divRef.current.scrollTo(0, Number(scrollTop));
  }, [divRef, searchParams]);

  const navigateSave = useMemo(() => {
    return (dest: string) => {
      navigate(dest, {
        state: {
          scrollTop: String(divRef.current?.scrollTop || 0),
          pathname,
          search,
        },
      });
    };
  }, [key, navigate, divRef, pathname, search]);

  return {
    divRef,
    navigateSave,
    navigate,
    navigateBack,
    navigateBackToPath,
  };
}
