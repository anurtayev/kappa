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
import { Loading } from "features/loading";
import { FieldArray, Formik } from "formik";
import {
  AppContext,
  attributeSchema,
  AttributeSortTerm,
  AttributeValueInput,
  InputType,
  Scalars,
  SearchInput,
  SortOrder,
  tagSchema,
  useGetAllTagsAndAttributesQuery,
} from "lib";
import React, { ChangeEvent, useContext, useRef, useState } from "react";
import { array, mixed, object, string, ValidationError } from "yup";

const { Option } = Select;

const sorterSchema = object({
  attribute: string().trim().lowercase().required(),
  sortOrder: mixed().oneOf([SortOrder.Asc, SortOrder.Desc]),
});

const validationSchema = object({
  filter: object({
    attributes: array().of(attributeSchema),
    tags: array().of(tagSchema),
  }),
  sorter: array().of(sorterSchema),
}).test(
  "global-test",
  "",
  ({ filter: { attributes, tags } }) =>
    !!attributes?.length ||
    !!tags?.length ||
    new ValidationError(
      "at least one filter must be present",
      undefined,
      "filter"
    )
);

type SearchInputFormType = {
  filter: {
    attributes: Array<AttributeValueInput>;
    tags: Array<Scalars["String"]>;
  };
  sorter: Array<AttributeSortTerm>;
};

type SearchInputFormParams = {
  setSearchInput: React.Dispatch<React.SetStateAction<SearchInput>>;
  searchInput: SearchInput;
};

const attributeInputInitValue: AttributeValueInput = {
  attribute: { name: "", type: InputType.String },
  value: "",
};

const sortInputInitValue: AttributeSortTerm = {
  attribute: "",
  sortOrder: SortOrder.Asc,
};

export const SearchInputForm = ({
  searchInput,
  setSearchInput,
}: SearchInputFormParams) => {
  const inputRef = useRef(null);
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

  const [sorterInputVisible, setSorterInputVisible] = useState<boolean>(false);
  const [sorterInputError, setSorterInputError] = useState<
    "" | "error" | "warning" | undefined
  >();
  const [sorterName, setSorterName] = useState<string>();
  const [sorterInputType, setSorterInputType] = useState<SortOrder>(
    SortOrder.Asc
  );

  const [tagName, setTagName] = useState<string>("");
  const [tagInputVisible, setTagInputVisible] = useState<boolean>(false);

  const { session } = useContext(AppContext);

  const { data, loading, error } = useGetAllTagsAndAttributesQuery({
    fetchPolicy: "cache-and-network",
    context: {
      headers: {
        authorization: `Bearer ${session?.getIdToken().getJwtToken()}`,
      },
    },
  });

  if (loading) return <Loading />;
  if (error) return <p>{error}</p>;

  const availableTags = data?.tags;
  const availableAttributes = data?.attributes;

  return (
    <Formik<SearchInputFormType>
      initialValues={{
        filter: {
          attributes: searchInput.filter.attributes || [],
          tags: searchInput.filter.tags || [],
        },
        sorter: searchInput.sorter || [],
      }}
      onSubmit={(
        { filter: { attributes, tags }, sorter },
        { setSubmitting }
      ) => {
        setSearchInput({
          filter: {
            ...(attributes.length ? { attributes } : {}),
            ...(tags.length ? { tags } : {}),
          },
          ...(sorter.length ? { sorter } : {}),
        });
        setSubmitting(false);
      }}
      validationSchema={validationSchema}
    >
      {({
        values: {
          filter: { attributes, tags },
          sorter,
        },
        isSubmitting,
        errors,
      }) => {
        return (
          <Space
            size="middle"
            direction="vertical"
            style={{ width: "100%", padding: "1rem" }}
          >
            {errors.filter && typeof errors.filter === "string" && (
              <p style={{ marginRight: "1rem", marginLeft: "1rem" }}>
                {errors.filter}
              </p>
            )}

            <FieldArray
              name="filter.tags"
              render={({ remove, push }) => {
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
                        onInputKeyDown={async (
                          e: React.KeyboardEvent<HTMLInputElement>
                        ) => {
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
              }}
            />

            <FieldArray
              name="filter.attributes"
              render={({ remove, push }) => {
                const handleChange = async () => {
                  const newAttr = {
                    attribute: {
                      name: attributeName,
                      type: attributeInputType,
                    },
                    value: attributeValue,
                  };

                  if (
                    (await attributeSchema.isValid(newAttr)) &&
                    !attributeInputError
                  ) {
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
                          options={(availableAttributes || []).map(
                            (attribute) => ({
                              value: attribute.name,
                              label: attribute.name,
                            })
                          )}
                          style={{ width: "8rem", marginRight: "1rem" }}
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
                              setAttributeInputError("error");
                            } else {
                              setAttributeInputError("");
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

            <FieldArray
              name="sorter"
              render={({ remove, push }) => {
                const handleChange = async () => {
                  const newSorter = {
                    attribute: sorterName,
                    sortOrder: sorterInputType,
                  };

                  const isValid = await sorterSchema.isValid(newSorter);

                  if (isValid && !sorterInputError) {
                    push(newSorter);
                    setSorterName("");
                    setSorterInputType(SortOrder.Asc);
                    setSorterInputVisible(false);
                  }
                };

                const handleCancel = () => setSorterInputVisible(false);

                return (
                  <Card title="Sorter" bodyStyle={{ display: "flex" }}>
                    {JSON.stringify(errors.sorter)}
                    {sorter.map((attributeSortTerm, index) => (
                      <>
                        <Tag
                          key={1}
                          color="green"
                          style={{
                            margin: "0px",
                            border: "0px",
                            height: "24px",
                          }}
                        >
                          {attributeSortTerm.attribute}
                        </Tag>
                        <Tag
                          key={2}
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
                          {attributeSortTerm.sortOrder}
                        </Tag>
                      </>
                    ))}

                    {!sorterInputVisible && (
                      <PlusOutlined
                        style={{ fontSize: 24 }}
                        onClick={() => {
                          setSorterInputVisible(true);
                        }}
                      />
                    )}

                    {sorterInputVisible && (
                      <Space size="small" style={{ height: "24px" }}>
                        <Select
                          value={sorterName}
                          status={sorterInputError}
                          allowClear
                          showSearch
                          showArrow={false}
                          size="small"
                          options={(attributes || []).map((attribute) => ({
                            value: attribute.attribute.name,
                            label: attribute.attribute.name,
                          }))}
                          style={{ width: "8rem", marginRight: "1rem" }}
                          onChange={(value) => {}}
                          onSelect={(value: any) => {
                            if (
                              !sorter.find(
                                (sorter) => sorter.attribute === value
                              )
                            ) {
                              setSorterName(value);
                            }
                          }}
                        />
                        <Radio.Group
                          onChange={(e: RadioChangeEvent) => {
                            setSorterInputType(e.target.value);
                          }}
                          style={{
                            display: "flex",
                          }}
                          value={sorterInputType}
                        >
                          <Radio value={SortOrder.Asc}>Asc</Radio>
                          <Radio value={SortOrder.Desc}>Desc</Radio>
                        </Radio.Group>
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
              <Button type="primary" disabled={isSubmitting}>
                Search
              </Button>
            </Card>
          </Space>
        );
      }}
    </Formik>
  );
};
