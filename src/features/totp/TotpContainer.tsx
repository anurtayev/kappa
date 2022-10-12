import { useAppContext } from "lib";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Totp } from "./Totp";
import { Typography } from "antd";

const { Title } = Typography;

export const TotpContainer = () => {
  const { setTitle, cognitoUser, setSession } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle(<Title>TOTP</Title>);
  }, []);

  return (
    <Totp
      cognitoUser={cognitoUser}
      navigate={navigate}
      setSession={setSession}
    />
  );
};
