import { useAppContext } from "lib";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Mfa } from "./Mfa";
import { Typography } from "antd";

const { Title } = Typography;

export const MfaContainer = () => {
  const { setTitle, cognitoUser, setSession } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle(<Title>Search</Title>);
  }, []);

  return (
    <Mfa
      cognitoUser={cognitoUser}
      navigate={navigate}
      setSession={setSession}
    />
  );
};
