import { CognitoUser, CognitoUserSession } from "amazon-cognito-identity-js";
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
  confirmationCode: string().trim().required(),
});

type MfaFormType = {
  confirmationCode: string;
};

type MfaType = {
  cognitoUser: CognitoUser | undefined;
  navigate: NavigateFunction;
  setSession: React.Dispatch<
    React.SetStateAction<CognitoUserSession | undefined>
  >;
};

export const Mfa = ({ cognitoUser, navigate, setSession }: MfaType) => {
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
            setSession(session);
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
                  <div style={{ width: "9rem", textAlign: "right" }}>
                    Confirmation Code
                  </div>
                  <Field
                    name="confirmationCode"
                    autoComplete="off"
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
