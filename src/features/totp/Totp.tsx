import { CognitoUser, CognitoUserSession } from "amazon-cognito-identity-js";
import { Button, Space } from "antd";
import { Field, Form, Formik } from "formik";
import { appRoutes } from "lib";

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

type TotpFormType = {
  totpCode: string;
};

type TotpType = {
  cognitoUser: CognitoUser | undefined;
  navigate: NavigateFunction;
  setSession: React.Dispatch<
    React.SetStateAction<CognitoUserSession | undefined>
  >;
};

export const Totp = ({ cognitoUser, navigate, setSession }: TotpType) => {
  const [searchParams] = useSearchParams();
  if (!cognitoUser) throw Error("No CognitoUser");

  return (
    <Formik<TotpFormType>
      initialValues={{
        totpCode: "",
      }}
      onSubmit={async ({ totpCode }, { setSubmitting, setStatus }) => {
        cognitoUser.sendMFACode(
          totpCode,
          {
            onFailure(err) {
              setStatus(err.message || JSON.stringify(err));
            },
            onSuccess(session) {
              setSession(session);
              console.log("==> id", session.getIdToken());
              console.log("==> access", session.getAccessToken());
              console.log("==> refresh", session.getRefreshToken());

              navigate(appRoutes.browse, { replace: true });
            },
          },
          "SOFTWARE_TOKEN_MFA"
        );

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
                      TOTP Code
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
