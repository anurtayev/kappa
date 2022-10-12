import { CheckOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Card,
  Input,
  InputNumber,
  Radio,
  RadioChangeEvent,
  Select,
  Space,
  Tag,
} from "antd";
import { attributeSchema, AttributeValueInput, InputType } from "lib";
import React, { ChangeEvent, useState } from "react";

export type Params = {
  attributes: Array<AttributeValueInput>;
  remove: <T>(index: number) => T | undefined;
  push: (obj: any) => void;
  availableAttributes:
    | {
        __typename?: "Attribute" | undefined;
        name: string;
        type: InputType;
      }[]
    | undefined;
};

export const Attributes = ({
  attributes,
  availableAttributes,
  remove,
  push,
}: Params) => {
  const [typeSelectionEnabled, setTypeSelectionEnabled] =
    useState<boolean>(true);

  const [attributeInputVisible, setAttributeInputVisible] =
    useState<boolean>(false);
  const [attributeInputError, setAttributeInputError] = useState<
    "" | "error" | "warning" | undefined
  >();
  const [attributeName, setAttributeName] = useState<string>();
  const [attributeInputType, setAttributeInputType] = useState<InputType>(
    InputType.String
  );
  const [attributeValue, setAttributeValue] = useState<string | number>();

  const handleChange = async () => {
    const newAttr = {
      attribute: {
        name: attributeName,
        type: attributeInputType,
      },
      value: attributeValue,
    };

    if ((await attributeSchema.isValid(newAttr)) && !attributeInputError) {
      push(newAttr);
      setAttributeName("");
      setAttributeInputType(InputType.String);
      setAttributeValue("");
      setAttributeInputVisible(false);
    }
  };
  const handleCancel = () => setAttributeInputVisible(false);
  return (
    <Card title="Attributes" bodyStyle={{ display: "flex" }}>
      {attributes.map(({ attribute, value }, index) => {
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
              closable
              onClose={(e) => {
                e.preventDefault();
                remove(index);
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

      {!attributeInputVisible && (
        <PlusOutlined
          style={{ fontSize: 24 }}
          onClick={() => {
            setAttributeInputVisible(true);
          }}
        />
      )}

      {attributeInputVisible && (
        <Space size="small" style={{ height: "24px" }}>
          <Select
            value={attributeName}
            status={attributeInputError}
            allowClear
            showSearch
            showArrow={false}
            size="small"
            options={(availableAttributes || []).map((attribute) => ({
              value: attribute.name,
              label: attribute.name,
            }))}
            style={{ width: "8rem", marginRight: "1rem" }}
            onSelect={(value: any) => {
              setAttributeName(value);
              setTypeSelectionEnabled(false);
              setAttributeInputType(
                availableAttributes?.find((att) => att.name === value)?.type ||
                  InputType.String
              );

              if (attributes.find((att) => att.attribute.name === value)) {
                setAttributeInputError("error");
              } else {
                setAttributeInputError("");
              }
            }}
            onInputKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
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
              value={attributeValue}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                setAttributeValue(e.target.value);
              }}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
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
              value={attributeValue}
              onChange={(value) => {
                setAttributeValue(value);
              }}
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  handleChange();
                } else if (e.key === "Escape") {
                  handleCancel();
                }
              }}
            />
          )}
          <CheckOutlined style={{ fontSize: 22 }} onClick={handleChange} />
          <CloseOutlined style={{ fontSize: 22 }} onClick={handleCancel} />
        </Space>
      )}
    </Card>
  );
};
