import { useAppContext } from "lib";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SignInForm } from "./SignInForm";
import { Typography } from "antd";

const { Title } = Typography;

export const AuthContainer = () => {
  const { setTitle, setCognitoUser } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle(<Title>Sign In</Title>);
  }, []);

  return <SignInForm navigate={navigate} setCognitoUser={setCognitoUser} />;
};
