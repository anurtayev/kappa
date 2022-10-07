import { Button, Card, Space, Tag, Select, Divider, Input } from "antd";
import type { InputRef } from "antd";
import { PlusOutlined } from "@ant-design/icons";
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
    name: string().trim().required(),
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

            <Card title="Attributes">
              <Select
                ref={inputRef}
                mode="multiple"
                size="small"
                defaultValue={
                  attributes &&
                  attributes.map(
                    (attributeValue: AttributeValue) =>
                      attributeValue.attribute.name +
                      ": " +
                      attributeValue.value
                  )
                }
                style={{ width: "100%" }}
                onChange={(tags: string[]) => {
                  console.log("==> onChange", tags);

                  setFieldValue("tags", tags);
                }}
                tagRender={(props: CustomTagProps) => {
                  const { label, value, closable, onClose } = props;
                  const onPreventMouseDown = (
                    event: React.MouseEvent<HTMLSpanElement>
                  ) => {
                    event.preventDefault();
                    event.stopPropagation();
                  };
                  return (
                    <Tag
                      onMouseDown={onPreventMouseDown}
                      closable={closable}
                      onClose={onClose}
                      style={{ marginRight: 3 }}
                    >
                      {label}
                    </Tag>
                  );
                }}
                open={inputVisible}
                onFocus={() => {
                  setInputVisible(true);
                }}
                onSelect={() => {
                  setInputVisible(false);
                }}
                onInputKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === "Escape") {
                    setInputVisible(false);
                    console.log("==> e", e.target, inputRef.current);
                    const r = inputRef.current as unknown as {
                      blur: () => void;
                    };
                    r.blur();
                  } else {
                    setInputVisible(true);
                  }
                }}
              >
                {availableAttributes?.map((attribute) => (
                  <Option key={attribute.name}>{attribute.name}</Option>
                ))}
              </Select>
            </Card>

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
