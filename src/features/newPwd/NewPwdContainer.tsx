import { LayoutContext } from "lib";
import { useContext, useEffect } from "react";
import { SignInForm } from "../auth/SignInForm";
export const NewPwdContainer = () => {
  const { setTitle } = useContext(LayoutContext);

  useEffect(() => {
    setTitle("New Password");
  });

  return <SignInForm />;
};
