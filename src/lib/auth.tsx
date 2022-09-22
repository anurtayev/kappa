import {
  CognitoUser,
  CognitoUserPool,
  CognitoUserSession,
  CookieStorage,
} from "amazon-cognito-identity-js";
import {
  createContext,
  Dispatch,
  ReactElement,
  ReactNode,
  useContext,
  useState,
} from "react";
import { Navigate, useLocation } from "react-router-dom";
import { appRoutes } from "./util";

export const cookieStorage = new CookieStorage({
  domain: process.env.REACT_APP_CLOUDFRONT_URL!.split("/").slice(-1)[0],
});

export const userPool = new CognitoUserPool({
  UserPoolId: process.env.REACT_APP_COGNITO_POOL_ID!,
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID!,
  Storage: cookieStorage,
});

export type AppContextType = {
  setNavs: Dispatch<Array<ReactElement>>;
  navs: ReactElement<any, string | React.JSXElementConstructor<any>>[];

  setTitle: Dispatch<string>;
  title: string | undefined;

  setSession: Dispatch<React.SetStateAction<CognitoUserSession | undefined>>;
  session: CognitoUserSession | undefined;

  userPool: CognitoUserPool;

  setCognitoUser: Dispatch<React.SetStateAction<CognitoUser | undefined>>;
  cognitoUser: CognitoUser | undefined;

  pageSize: number;
  setPageSize: Dispatch<number>;
};

export const AppContext = createContext<AppContextType>(undefined!);

export const useAppContext = () => useContext(AppContext);

export function AppProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<CognitoUserSession>();
  const [navs, setNavs] = useState<Array<ReactElement>>([]);
  const [title, setTitle] = useState<string>();
  const [cognitoUser, setCognitoUser] = useState<CognitoUser>();
  const [pageSize, setPageSize] = useState<number>(
    Number(process.env.REACT_APP_PAGE_SIZE || "20")
  );

  return (
    <AppContext.Provider
      value={{
        setNavs,
        setTitle,
        userPool,
        title,
        navs,
        cognitoUser,
        setCognitoUser,
        setSession,
        session,
        pageSize,
        setPageSize,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  let { session } = useAppContext();
  let location = useLocation();

  if (
    !session ||
    Number(session.getIdToken().payload.exp) * 1000 < Date.now()
  ) {
    return (
      <Navigate to={appRoutes.signin} state={{ from: location }} replace />
    );
  }

  return children;
}
