import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from "amazon-cognito-identity-js";
import { Button, Space } from "antd";
import AWS from "aws-sdk";
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
  newPassword: string().trim().required(),
  verifyPassword: string().trim().required(),
});

type NewPwdType = {
  newPassword: string;
  verifyPassword: string;
};

const AWS_REGION = "us-east-1";

AWS.config.update({
  region: AWS_REGION,
});

const userPool = new CognitoUserPool({
  UserPoolId: process.env.REACT_APP_COGNITO_POOL_ID || "",
  ClientId: process.env.REACT_APP_COGNITO_CLIENT_ID || "",
});

export const NewPwd = () => {
  return (
    <Formik<NewPwdType>
      initialValues={{
        newPassword: "",
        verifyPassword: "",
      }}
      onSubmit={async ({ newPassword, verifyPassword }, { setSubmitting }) => {
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
                  <Field name="username" />
                </Space>
                <Space direction="horizontal" size="middle">
                  <div style={{ width: "6rem", textAlign: "right" }}>
                    Verify Password
                  </div>
                  <Field name="password" type="password" />
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
