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
  const { pathname, state, key } = useLocation();
  console.log("==>", pathname, key);

  const navigate = useNavigate();
  const [divRef] = useState<React.RefObject<HTMLDivElement>>(
    createRef<HTMLDivElement>()
  );

  const navigateBackLong = useMemo(
    () => () => {
      const { backLong } = state as LocationState;
      backLong && navigate(backLong);
    },
    [navigate, state]
  );

  const navigateSave = useMemo(() => {
    return (dest: string | number) => {
      sessionStorage.set();
      if (typeof dest === "number") {
        navigate(-1);
      } else {
        navigate(dest);
      }
    };
  }, [navigate, divRef, pathname]);

  useEffect(() => {
    const scrollTop = state.scrollTop;
    divRef.current && scrollTop && divRef.current.scrollTo(0, scrollTop);
  }, [divRef, state]);

  return {
    divRef,
    navigate,
    navigateUp: navigateBackLong,
  };
}
