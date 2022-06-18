import { useAppContext } from "lib";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NewPwd } from "./NewPwd";

export const NewPwdContainer = () => {
  const { setTitle, cognitoUser } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    setTitle("New Password");
  });

  return <NewPwd cognitoUser={cognitoUser} navigate={navigate} />;
};
