import { Field, FieldArray, Formik, Form } from "formik";
import { array, mixed, object, string, ValidationError } from "yup";
import styled from "styled-components";
import { Button, Space } from "antd";

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

export const SignInForm = () => {
  return (
    <Formik<SignInFormType>
      initialValues={{
        username: "",
        password: "",
      }}
      onSubmit={({ username, password }, { setSubmitting }) => {
        setSubmitting(false);
      }}
      validationSchema={validationSchema}
    >
      {({ isSubmitting, submitForm, errors }) => {
        return (
          <FlexForm>
            <Space
              direction="vertical"
              size="middle"
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
                  <Field name="password" />
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
