import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import { Button, Space } from "antd";
import AWS from "aws-sdk";
import { Field, Form, Formik } from "formik";
import { appRoutes, AppContext, useLocationFrom } from "lib";
import { Dispatch, useContext } from "react";
import { NavigateFunction, useLocation } from "react-router-dom";
import styled from "styled-components";
import { object, string } from "yup";

export const FlexForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 1em;
  height: 100%;
`;

const validationSchema = object({
  username: string().trim().required(),
  password: string().trim().required(),
});

type SignInFormType = {
  username: string;
  password: string;
};

const AWS_REGION = "us-east-1";

AWS.config.update({
  region: AWS_REGION,
});

export type SignInFormParams = {
  navigate: NavigateFunction;
  setCognitoUser: Dispatch<React.SetStateAction<CognitoUser | undefined>>;
};

export const SignInForm = ({ navigate, setCognitoUser }: SignInFormParams) => {
  const { userPool, setEmail } = useContext(AppContext);
  const from = useLocationFrom();

  return (
    <Formik<SignInFormType>
      initialValues={{
        username: "email",
        password: "pwd",
      }}
      onSubmit={async ({ username, password }, { setSubmitting }) => {
        setEmail(username);
        const cognitoUser = new CognitoUser({
          Username: username,
          Pool: userPool,
        });
        setCognitoUser(cognitoUser);

        cognitoUser.authenticateUser(
          new AuthenticationDetails({ Username: username, Password: password }),
          {
            onFailure(err) {
              console.log("==> onFailure", err);
            },
            onSuccess(session, userConfirmationNecessary) {
              console.log("==> onSuccess", session, userConfirmationNecessary);
              navigate(from, { replace: true });
            },
            customChallenge(challengeParameters) {
              console.log("==> customChallenge", challengeParameters);
            },
            mfaRequired(challengeName, challengeParameters) {
              // SMS_MFA
              // {CODE_DELIVERY_DELIVERY_MEDIUM: 'SMS', CODE_DELIVERY_DESTINATION: '+*******8884'}
              navigate(appRoutes.authMfa, { replace: true });
            },
            newPasswordRequired(userAttributes, requiredAttributes) {
              navigate(appRoutes.authNewPwd);
            },
            mfaSetup(challengeName, challengeParameters) {
              console.log("==> mfaSetup", challengeName, challengeParameters);
            },
            selectMFAType(challengeName, challengeParameters) {
              console.log(
                "==> selectMFAType",
                challengeName,
                challengeParameters
              );
            },
            totpRequired(challengeName, challengeParameters) {
              console.log(
                "==> totpRequired",
                challengeName,
                challengeParameters
              );
            },
          }
        );

        setSubmitting(false);
      }}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, submitForm, errors }) => {
        return (
          <FlexForm>
            <Space
              direction="vertical"
              size="large"
              style={{ textAlign: "right" }}
            >
              <Space direction="vertical" size="middle">
                <Space direction="horizontal" size="middle">
                  <div style={{ width: "6rem", textAlign: "right" }}>
                    Username
                  </div>
                  <Field name="username" />
                </Space>
                <Space direction="horizontal" size="middle">
                  <div style={{ width: "6rem", textAlign: "right" }}>
                    Password
                  </div>
                  <Field name="password" type="password" />
                </Space>
              </Space>
              <Button
                disabled={isSubmitting}
                onClick={() => submitForm()}
                type="primary"
              >
                Sign In
              </Button>
            </Space>
          </FlexForm>
        );
      }}
    </Formik>
  );
};
