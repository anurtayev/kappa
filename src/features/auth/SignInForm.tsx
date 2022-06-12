import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from "amazon-cognito-identity-js";
import { Button, Space } from "antd";
import AWS, { CognitoIdentityCredentials } from "aws-sdk";
import { Field, Form, Formik } from "formik";
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

console.log(
  "==> ",
  process.env.REACT_APP_COGNITO_POOL_ID,
  process.env.REACT_APP_COGNITO_CLIENT_ID
);

const userPool = new CognitoUserPool({
  UserPoolId: process.env.REACT_APP_COGNITO_POOL_ID || "",
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID || "",
});

export const SignInForm = () => {
  return (
    <Formik<SignInFormType>
      initialValues={{
        username: "email",
        password: "pwd",
      }}
      onSubmit={async ({ username, password }, { setSubmitting }) => {
        console.log("==> ", username, password);

        const cognitoUser = new CognitoUser({
          Username: username,
          Pool: userPool,
        });

        cognitoUser.authenticateUser(
          new AuthenticationDetails({ Username: username, Password: password }),
          {
            onFailure(err) {
              console.log("==> onFailure", err);
            },
            onSuccess(result) {
              console.log("==> onSuccess", result);
            },
            customChallenge(challengeParameters) {
              console.log("==> customChallenge", challengeParameters);
            },
            mfaRequired(challengeName, challengeParameters) {
              console.log(
                "==> mfaRequired",
                challengeName,
                challengeParameters
              );
            },
            newPasswordRequired(userAttributes, requiredAttributes) {
              console.log(
                "==> newPasswordRequired",
                userAttributes,
                requiredAttributes
              );
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
