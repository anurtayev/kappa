import { createRef, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

type Destination = {
  pathname: string;
  token: string;
};

type LocationState = {
  backLong?: Destination;
  backShort?: Destination;
  token?: string;
};

export function useScrollRef() {
  const { pathname, search } = useLocation();

  const navigate = useNavigate();
  const [divRef] = useState<React.RefObject<HTMLDivElement>>(
    createRef<HTMLDivElement>()
  );

  const navigateSave = useMemo(() => {
    return (dest: string | number) => {
      sessionStorage.setItem(
        pathname + search,
        String(divRef.current?.scrollTop || 0)
      );
      if (typeof dest === "number") {
        navigate(-1);
      } else {
        navigate(dest);
      }
    };
  }, [navigate, divRef, pathname, search]);

  useEffect(() => {
    const scrollTop = Number(sessionStorage.getItem(pathname + search) || 0);
    divRef.current?.scrollTo(0, scrollTop);
  }, [divRef, pathname, search]);

  return {
    divRef,
    navigate,
    navigateSave,
  };
}
