import { useAppContext } from "lib";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mfa } from "./Mfa";
export const MfaContainer = () => {
  const { setTitle, cognitoUser } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle("MFA");
  });

  return <Mfa cognitoUser={cognitoUser} navigate={navigate} />;
};
