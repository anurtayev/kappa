import { CheckOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Input,
  InputNumber,
  Radio,
  RadioChangeEvent,
  Select,
  Space,
  Tag,
} from "antd";
import { AsyncImage } from "features/asyncImage";
import { FieldArray, Formik } from "formik";
import {
  Attribute,
  AttributeValueInput,
  InputType,
  isFolder,
  Maybe,
  MetaData,
  Scalars,
  UpdateMetaDataMutationFn,
  tagSchema,
  attributeSchema,
} from "lib";
import React, { ChangeEvent, useRef, useState } from "react";
import { NavigateFunction } from "react-router-dom";
import { array, mixed, object, string } from "yup";

const { Option } = Select;

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
  const [inputError, setInputError] = useState<
    "" | "error" | "warning" | undefined
  >();
  const inputRef = useRef(null);
  const [typeSelectionEnabled, setTypeSelectionEnabled] =
    useState<boolean>(true);

  const [attributeName, setAttributeName] = useState<string>();
  const [attributeInputType, setAttributeInputType] = useState<InputType>(
    InputType.String
  );
  const [attributeValue, setAttributeValue] = useState<string | number>();

  return (
    <Formik<Values>
      initialValues={{
        attributes:
          metaData?.attributes?.map(({ attribute: { name, type }, value }) => ({
            attribute: { name, type },
            value,
          })) || [],
        tags: metaData?.tags || [],
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
        values: { tags, attributes },
        isSubmitting,
        setFieldValue,
        handleChange,
        handleSubmit,
        submitForm,
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
              render={({ remove, push }) => {
                const handleChange = async () => {
                  const newAttr = {
                    attribute: {
                      name: attributeName,
                      type: attributeInputType,
                    },
                    value: attributeValue,
                  };

                  if ((await attributeSchema.isValid(newAttr)) && !inputError) {
                    push(newAttr);
                    setAttributeName("");
                    setAttributeInputType(InputType.String);
                    setAttributeValue("");
                    setInputVisible(false);
                  }
                };
                const handleCancel = () => setInputVisible(false);

                return (
                  <Card title="Attributes" bodyStyle={{ display: "flex" }}>
                    {attributes.map(({ attribute, value }) => {
                      return (
                        <>
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
                              remove(
                                attributes.findIndex(
                                  ({ attribute: { name } }) =>
                                    name === attribute.name
                                )
                              );
                            }}
                            style={{
                              margin: "0px",
                              border: "0px",
                              height: "24px",
                              marginRight: "1rem",
                            }}
                          >
                            {value}
                          </Tag>
                        </>
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
                      <Space size="small" style={{ height: "24px" }}>
                        <Select
                          value={attributeName}
                          status={inputError}
                          allowClear
                          showSearch
                          showArrow={false}
                          size="small"
                          options={(availableAttributes || []).map(
                            (attribute) => ({
                              value: attribute.name,
                              label: attribute.name,
                            })
                          )}
                          style={{ width: "8rem", marginRight: "1rem" }}
                          onChange={(value) => {}}
                          onSelect={(value: any) => {
                            setAttributeName(value);
                            setTypeSelectionEnabled(false);
                            setAttributeInputType(
                              availableAttributes?.find(
                                (att) => att.name === value
                              )?.type || InputType.String
                            );

                            if (
                              attributes.find(
                                (att) => att.attribute.name === value
                              )
                            ) {
                              setInputError("error");
                            } else {
                              setInputError("");
                            }
                          }}
                          onInputKeyDown={(
                            e: React.KeyboardEvent<HTMLInputElement>
                          ) => {
                            if (e.key === "Enter") {
                              setAttributeName(e.currentTarget.value);
                              setTypeSelectionEnabled(true);
                            }
                          }}
                        />
                        <Radio.Group
                          disabled={!typeSelectionEnabled}
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
                        {attributeInputType === InputType.String ? (
                          <Input
                            size="small"
                            ref={inputRef}
                            value={attributeValue}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              setAttributeValue(e.target.value);
                            }}
                            onKeyDown={(
                              e: React.KeyboardEvent<HTMLInputElement>
                            ) => {
                              if (e.key === "Enter") {
                                handleChange();
                              } else if (e.key === "Escape") {
                                handleCancel();
                              }
                            }}
                          />
                        ) : (
                          <InputNumber
                            style={{ width: "100%" }}
                            size="small"
                            ref={inputRef}
                            value={attributeValue}
                            onChange={(value) => {
                              setAttributeValue(value);
                            }}
                            onKeyDown={(
                              e: React.KeyboardEvent<HTMLInputElement>
                            ) => {
                              if (e.key === "Enter") {
                                handleChange();
                              } else if (e.key === "Escape") {
                                handleCancel();
                              }
                            }}
                          />
                        )}
                        <CheckOutlined
                          style={{ fontSize: 22 }}
                          onClick={handleChange}
                        />
                        <CloseOutlined
                          style={{ fontSize: 22 }}
                          onClick={handleCancel}
                        />
                      </Space>
                    )}
                  </Card>
                );
              }}
            />

            <Card>
              <Space size="middle">
                <Button
                  type="primary"
                  disabled={isSubmitting}
                  onClick={() => submitForm()}
                >
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
