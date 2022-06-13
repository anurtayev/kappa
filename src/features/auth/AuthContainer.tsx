import { LayoutContext } from "lib";
import { useContext, useEffect } from "react";
import { SignInForm } from "./SignInForm";
import { useNavigate } from "react-router-dom";

export const AuthContainer = () => {
  const { setTitle } = useContext(LayoutContext);
  const navigate = useNavigate();

  useEffect(() => {
    setTitle("Sign In");
  });

  return <SignInForm navigate={navigate} />;
};
