import { useAppContext } from "lib";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mfa } from "./Mfa";
export const MfaContainer = () => {
  const { setTitle, cognitoUser, setSession } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle("MFA");
  });

  return (
    <Mfa
      cognitoUser={cognitoUser}
      navigate={navigate}
      setSession={setSession}
    />
  );
};
