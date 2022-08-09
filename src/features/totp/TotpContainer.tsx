import { useAppContext } from "lib";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Totp } from "./Totp";
export const TotpContainer = () => {
  const { setTitle, cognitoUser, setSession } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle("Totp");
  });

  return (
    <Totp
      cognitoUser={cognitoUser}
      navigate={navigate}
      setSession={setSession}
    />
  );
};
