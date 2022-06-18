import { CognitoUser } from "amazon-cognito-identity-js";
import { Button, Space } from "antd";
import { Field, Form, Formik } from "formik";
import { useLocationFrom } from "lib";
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

type MfaFormType = {
  confirmationCode: string;
};

type MfaType = {
  cognitoUser: CognitoUser | undefined;
  navigate: NavigateFunction;
};

export const Mfa = ({ cognitoUser, navigate }: MfaType) => {
  const from = useLocationFrom();
  if (!cognitoUser) throw Error("No CognitoUser");

  return (
    <Formik<MfaFormType>
      initialValues={{
        confirmationCode: "",
      }}
      onSubmit={async ({ confirmationCode }, { setSubmitting }) => {
        cognitoUser.sendMFACode(confirmationCode, {
          onFailure(err) {
            console.log("==> onFailure", err);
          },
          onSuccess(session, userConfirmationNecessary) {
            console.log("==> onSuccess", session, userConfirmationNecessary);
            navigate(from, { replace: true });
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
