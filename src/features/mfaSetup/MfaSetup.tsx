import { CognitoUser, CognitoUserSession } from "amazon-cognito-identity-js";
import { Button, Space } from "antd";
import { Field, Form, Formik } from "formik";
import { useLocationFrom } from "lib";
import { NavigateFunction, useSearchParams } from "react-router-dom";
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
  totpCode: string().trim().required(),
});

type MfaFormType = {
  totpCode: string;
};

type MfaSetupType = {
  cognitoUser: CognitoUser | undefined;
  navigate: NavigateFunction;
  setSession: React.Dispatch<
    React.SetStateAction<CognitoUserSession | undefined>
  >;
};

export const MfaSetup = ({
  cognitoUser,
  navigate,
  setSession,
}: MfaSetupType) => {
  const from = useLocationFrom();
  const [searchParams] = useSearchParams();
  if (!cognitoUser) throw Error("No CognitoUser");

  return (
    <Formik<MfaFormType>
      initialValues={{
        totpCode: "",
      }}
      onSubmit={async ({ totpCode }, { setSubmitting, setStatus }) => {
        cognitoUser.verifySoftwareToken(totpCode, "friendlyDeviceName", {
          onFailure(err) {
            setStatus(err.message || JSON.stringify(err));
          },
          onSuccess(session) {
            setSession(session);
            navigate(from, { replace: true });
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
            {searchParams && <p>{searchParams.get("secretCode")}</p>}
            <FlexForm>
              <Space
                direction="vertical"
                size="large"
                style={{ textAlign: "right" }}
              >
                <Space direction="vertical" size="middle">
                  <Space direction="horizontal" size="middle">
                    <div style={{ width: "9rem", textAlign: "right" }}>
                      Setup Code
                    </div>
                    <Field
                      name="totpCode"
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
          </>
        );
      }}
    </Formik>
  );
};
