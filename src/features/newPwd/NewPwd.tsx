import { CognitoUser } from "amazon-cognito-identity-js";
import { Button, Space } from "antd";
import { Field, Form, Formik } from "formik";
import { appRoutes, useLocationFrom } from "lib";
import { NavigateFunction, createSearchParams } from "react-router-dom";
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
      onSubmit={async ({ newPassword }, { setSubmitting, setStatus }) => {
        cognitoUser.completeNewPasswordChallenge(newPassword, null, {
          onFailure(err) {
            setStatus(err.message || JSON.stringify(err));
          },
          onSuccess(result) {
            navigate(from, { replace: true });
          },
          mfaRequired(challengeName, challengeParameters) {
            navigate(appRoutes.mfa, { replace: true });
          },
          mfaSetup(challengeName, challengeParameters) {
            console.log("==> mfaSetup", challengeName, challengeParameters);
            cognitoUser.associateSoftwareToken({
              associateSecretCode(secretCode) {
                navigate(
                  {
                    pathname: appRoutes.mfaSetup,
                    search: `?${createSearchParams({ secretCode })}`,
                  },
                  { replace: true }
                );
              },
              onFailure(err) {
                setStatus(err.message || JSON.stringify(err));
              },
            });
          },
        });

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
          </>
        );
      }}
    </Formik>
  );
};