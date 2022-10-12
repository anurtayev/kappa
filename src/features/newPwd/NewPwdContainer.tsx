import { useAppContext } from "lib";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NewPwd } from "./NewPwd";
import { Typography } from "antd";

const { Title } = Typography;

export const NewPwdContainer = () => {
  const { setTitle, cognitoUser } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle(<Title>New Password</Title>);
  }, []);

  return <NewPwd cognitoUser={cognitoUser} navigate={navigate} />;
};
