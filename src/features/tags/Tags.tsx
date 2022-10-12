import { PlusOutlined } from "@ant-design/icons";
import { Card, Select, Tag } from "antd";
import { Scalars, tagSchema } from "lib";
import React, { useState } from "react";

export type Params = {
  tags: Array<Scalars["String"]>;
  remove: <T>(index: number) => T | undefined;
  push: (obj: any) => void;
  availableTags: string[] | undefined;
};

export const Tags = ({ tags, remove, push, availableTags }: Params) => {
  const [tagName, setTagName] = useState<string>("");
  const [tagInputVisible, setTagInputVisible] = useState<boolean>(false);

  return (
    <Card title="Tags" bodyStyle={{ display: "flex" }}>
      {tags.map((tag, index) => {
        return (
          <Tag
            color="magenta"
            style={{
              margin: "0px",
              border: "0px",
              height: "24px",
              marginRight: "1rem",
            }}
            closable
            onClose={(e) => {
              e.preventDefault();
              remove(index);
            }}
          >
            {tag}
          </Tag>
        );
      })}

      {!tagInputVisible && (
        <PlusOutlined
          style={{ fontSize: 24 }}
          onClick={() => {
            setTagInputVisible(true);
          }}
        />
      )}

      {tagInputVisible && (
        <Select
          value={tagName}
          allowClear
          showSearch
          showArrow={false}
          size="small"
          options={(availableTags || []).map((tag) => ({
            value: tag,
          }))}
          style={{ width: "8rem", marginRight: "1rem" }}
          onSelect={async (value: any) => {
            if (
              (await tagSchema.isValid(value)) &&
              !tags.find((tag) => tag === value)
            ) {
              push(value);
            }
            setTagInputVisible(false);
          }}
          onInputKeyDown={async (e: React.KeyboardEvent<HTMLInputElement>) => {
            const newTag = e.currentTarget.value;
            if (e.key === "Enter") {
              if (
                (await tagSchema.isValid(newTag)) &&
                !tags.find((tag) => tag === newTag)
              ) {
                push(newTag);
              }
              setTagInputVisible(false);
            }
          }}
        />
      )}
    </Card>
  );
};
