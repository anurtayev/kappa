import { LayoutContext } from "lib";
import { useContext, useEffect } from "react";
import { SignInForm } from "./SignInForm";
export const AuthContainer = () => {
  const { setTitle } = useContext(LayoutContext);

  useEffect(() => {
    setTitle("Sign In");
  });

  return <SignInForm />;
};
