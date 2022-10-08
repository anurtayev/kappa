import {
  Button,
  Card,
  Space,
  Tag,
  Select,
  Divider,
  Input,
  Switch,
  Radio,
  RadioChangeEvent,
} from "antd";
import type { InputRef } from "antd";
import { PlusOutlined, CheckOutlined } from "@ant-design/icons";
import { AsyncImage } from "features/asyncImage";
import { Attributes } from "features/attributes";
import { Tags } from "features/tags";
import { Field, FieldArray, Formik, FieldProps } from "formik";
import React, { useEffect, useState, ChangeEvent, useRef } from "react";
import type { CustomTagProps } from "rc-select/lib/BaseSelect";
import {
  Attribute,
  AttributeValue,
  AttributeValueInput,
  InputType,
  isFolder,
  Maybe,
  MetaData,
  Scalars,
  UpdateMetaDataMutationFn,
} from "lib";
import { NavigateFunction } from "react-router-dom";
import { array, mixed, object, string } from "yup";

const { Option } = Select;

const attributeInputInitValue: AttributeValueInput = {
  attribute: { name: "", type: InputType.String },
  value: "",
};

const tagSchema = string().trim().lowercase().required();

const attributeSchema = object({
  attribute: object({
    name: string().trim().lowercase().required(),
    type: mixed().oneOf([InputType.String, InputType.Number]),
  }),
  value: string().trim().required(),
});

const validationSchema = object({
  attributes: array().of(attributeSchema),
  tags: array().of(tagSchema),
});

type MetaDataInputFormParams = {
  id: string;
  metaData: Maybe<MetaData>;
  updateMetaDataMutation: UpdateMetaDataMutationFn;
  navigate: NavigateFunction;
  availableAttributes?: Array<Attribute>;
  availableTags?: Array<string>;
};

type Values = {
  attributes: Array<AttributeValueInput>;
  tags: Array<Scalars["String"]>;
  tagInput: string;
  attributeInput: AttributeValueInput;
};

export const MetaDataInputForm = ({
  id,
  metaData,
  updateMetaDataMutation,
  navigate,
  availableAttributes,
  availableTags,
}: MetaDataInputFormParams) => {
  const [inputVisible, setInputVisible] = useState<boolean>(false);
  const inputRef = useRef(null);

  const [attributeName, setAttributeName] = useState<string>();
  const [attributeInputType, setAttributeInputType] = useState<InputType>(
    InputType.String
  );
  const [attributeValue, setAttributeValue] = useState<string>();

  return (
    <Formik<Values>
      initialValues={{
        attributes:
          metaData?.attributes?.map(({ attribute: { name, type }, value }) => ({
            attribute: { name, type },
            value,
          })) || [],
        tags: metaData?.tags || [],
        tagInput: "",
        attributeInput: attributeInputInitValue,
      }}
      onSubmit={async ({ attributes, tags }, { setSubmitting }) => {
        try {
          await updateMetaDataMutation({
            variables: {
              id,
              ...(attributes.length || tags.length
                ? {
                    metaDataInput: {
                      ...(attributes.length ? { attributes } : {}),
                      ...(tags.length ? { tags } : {}),
                    },
                  }
                : {}),
            },
          });

          setSubmitting(false);
          navigate(-1);
        } catch (error) {
          console.error(error);
        }
      }}
      validationSchema={validationSchema}
    >
      {({
        values: { tags, attributes, tagInput, attributeInput },
        isSubmitting,
        setFieldValue,
        handleChange,
      }) => {
        return (
          <Space
            direction="vertical"
            size="middle"
            style={{ width: "100%", padding: "1rem" }}
          >
            {!isFolder(id) && (
              <Card>
                <AsyncImage
                  id={id}
                  width={Number(process.env.REACT_APP_ICON_WIDTH || 0)}
                  height={Number(process.env.REACT_APP_ICON_HEIGHT || 0)}
                />
              </Card>
            )}

            <Card title="Tags">
              <Select
                mode="tags"
                size="small"
                defaultValue={tags}
                style={{ width: "100%" }}
                onChange={(tags: string[]) => {
                  setFieldValue("tags", tags);
                }}
              >
                {availableTags?.map((tag) => (
                  <Option key={tag}>{tag}</Option>
                ))}
              </Select>
            </Card>

            <FieldArray
              name="attributes"
              render={({ remove, push }) => (
                <Card title="Attributes" bodyStyle={{ display: "flex" }}>
                  {attributes.map(({ attribute, value }) => {
                    return (
                      <Card
                        bodyStyle={{
                          padding: "0px",
                          display: "flex",
                        }}
                        style={{ marginRight: "5px" }}
                        key={attribute.name}
                      >
                        <Tag
                          color="purple"
                          style={{
                            margin: "0px",
                            border: "0px",
                            height: "24px",
                          }}
                        >
                          {attribute.name}
                        </Tag>
                        <Tag
                          closable={true}
                          onClose={(e) => {
                            console.log(e);
                          }}
                          style={{
                            margin: "0px",
                            border: "0px",
                            height: "24px",
                          }}
                        >
                          {value}
                        </Tag>
                      </Card>
                    );
                  })}

                  {!inputVisible && (
                    <PlusOutlined
                      style={{ fontSize: 24 }}
                      onClick={() => {
                        setInputVisible(true);
                      }}
                    />
                  )}

                  {inputVisible && (
                    <Card
                      bodyStyle={{
                        display: "flex",
                        height: "24px",
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      <Select
                        showSearch
                        showArrow={false}
                        size="small"
                        options={(availableAttributes || []).map(
                          (attribute) => ({
                            value: attribute.name,
                            label: attribute.name,
                          })
                        )}
                        style={{ width: "100%" }}
                        onChange={(value) => {
                          setAttributeName(value);
                        }}
                      />
                      <Radio.Group
                        onChange={(e: RadioChangeEvent) => {
                          setAttributeInputType(e.target.value);
                        }}
                        style={{
                          display: "flex",
                        }}
                        value={attributeInputType}
                      >
                        <Radio value={InputType.String}>STR</Radio>
                        <Radio value={InputType.Number}>NUM</Radio>
                      </Radio.Group>
                      <Input
                        ref={inputRef}
                        value={attributeValue}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          setAttributeValue(e.target.value);
                        }}
                      />
                      <CheckOutlined
                        style={{ fontSize: 24 }}
                        onClick={() => {
                          if (attributeName && attributeValue) {
                            push({
                              attribute: {
                                name: attributeName,
                                type: attributeInputType,
                              },
                              value: attributeValue,
                            });
                            setAttributeName("");
                            setAttributeInputType(InputType.String);
                            setAttributeValue("");
                            setInputVisible(false);
                          }
                        }}
                      />
                    </Card>
                  )}
                </Card>
              )}
            />

            <Card>
              <Space size="middle">
                <Button type="primary" disabled={isSubmitting}>
                  Submit
                </Button>
                <Button type="default" onClick={() => navigate(-1)}>
                  Cancel
                </Button>
              </Space>
            </Card>
          </Space>
        );
      }}
    </Formik>
  );
};
