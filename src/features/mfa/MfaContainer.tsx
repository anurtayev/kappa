import { LayoutContext } from "lib";
import { useContext, useEffect } from "react";
import { SignInForm } from "../auth/SignInForm";
export const MfaContainer = () => {
  const { setTitle } = useContext(LayoutContext);

  useEffect(() => {
    setTitle("OTP");
  });

  return <SignInForm />;
};
