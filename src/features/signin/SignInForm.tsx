import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import { Button, Space } from "antd";
import { Field, Form, Formik } from "formik";
import { AppContext, appRoutes, useLocationFrom } from "lib";
import { Dispatch, useContext } from "react";
import { NavigateFunction } from "react-router-dom";
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

export type SignInFormParams = {
  navigate: NavigateFunction;
  setCognitoUser: Dispatch<React.SetStateAction<CognitoUser | undefined>>;
};

export const SignInForm = ({ navigate, setCognitoUser }: SignInFormParams) => {
  const { userPool } = useContext(AppContext);
  const from = useLocationFrom();

  return (
    <Formik<SignInFormType>
      initialValues={{
        username: "",
        password: "",
      }}
      onSubmit={async (
        { username, password },
        { setSubmitting, setStatus }
      ) => {
        const cognitoUser = new CognitoUser({
          Username: username,
          Pool: userPool,
        });
        setCognitoUser(cognitoUser);

        cognitoUser.authenticateUser(
          new AuthenticationDetails({ Username: username, Password: password }),
          {
            onFailure(err) {
              setStatus(err.message || JSON.stringify(err));
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
              navigate(appRoutes.mfa, { replace: true });
            },
            newPasswordRequired(userAttributes, requiredAttributes) {
              navigate(appRoutes.newpwd, { replace: true });
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
      {({ isSubmitting, submitForm, status }) => {
        return (
          <>
            <p>{status}</p>
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
                    <Field
                      name="password"
                      type="password"
                      onKeyPress={(e: any) => {
                        if (e.key === "Enter") {
                          submitForm();
                        }
                      }}
                    />
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
          </>
        );
      }}
    </Formik>
  );
};
