import { CognitoUser, CognitoUserPool } from "amazon-cognito-identity-js";
import { Button, Space } from "antd";
import AWS from "aws-sdk";
import { Field, Form, Formik } from "formik";
import { appRoutes, useLocationFrom } from "lib";
import { NavigateFunction } from "react-router-dom";
import styled from "styled-components";
import { object, string, ValidationError } from "yup";

export const FlexForm = styled(Form)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 1em;
  height: 100%;
`;

const validationSchema = object({
  newPassword: string().trim().required(),
  verifyPassword: string().trim().required(),
}).test(
  "pwds-equality",
  "",
  ({ newPassword, verifyPassword }) =>
    newPassword === verifyPassword ||
    new ValidationError("password value must match", undefined, "")
);

type NewPwdFormType = {
  newPassword: string;
  verifyPassword: string;
};

type NewPwdType = {
  cognitoUser: CognitoUser | undefined;
  navigate: NavigateFunction;
};

export const NewPwd = ({ cognitoUser, navigate }: NewPwdType) => {
  const from = useLocationFrom();
  if (!cognitoUser) throw Error("No CognitoUser");

  return (
    <Formik<NewPwdFormType>
      initialValues={{
        newPassword: "",
        verifyPassword: "",
      }}
      onSubmit={async ({ newPassword, verifyPassword }, { setSubmitting }) => {
        cognitoUser.completeNewPasswordChallenge(newPassword, null, {
          onFailure(err) {
            console.log("==> pooja onFailure", err);
          },
          onSuccess(result) {
            console.log("==> pooja!!", result);
            navigate(from, { replace: true });
          },
          mfaRequired(challengeName, challengeParameters) {
            navigate(appRoutes.mfa, { replace: true });
          },
        });

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
                    New Password
                  </div>
                  <Field name="newPassword" type="password" />
                </Space>
                <Space direction="horizontal" size="middle">
                  <div style={{ width: "6rem", textAlign: "right" }}>
                    Verify Password
                  </div>
                  <Field
                    name="verifyPassword"
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
                Submit
              </Button>
            </Space>
          </FlexForm>
        );
      }}
    </Formik>
  );
};
