import { useAppContext } from "lib";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MfaSetup } from "./MfaSetup";
export const MfaSetupContainer = () => {
  const { setTitle, cognitoUser, setSession } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle("MFA Setup");
  });

  return (
    <MfaSetup
      cognitoUser={cognitoUser}
      navigate={navigate}
      setSession={setSession}
    />
  );
};
