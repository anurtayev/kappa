import { useAppContext } from "lib";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SignInForm } from "./SignInForm";

export const AuthContainer = () => {
  const { setTitle, setCognitoUser } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle("Sign In");
  });

  return <SignInForm navigate={navigate} setCognitoUser={setCognitoUser} />;
};
