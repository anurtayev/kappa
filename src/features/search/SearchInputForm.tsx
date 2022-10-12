import { CheckOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Radio,
  RadioChangeEvent,
  Select,
  Space,
  Tag,
} from "antd";
import { Attributes } from "features/attributes";
import { Loading } from "features/loading";
import { Tags } from "features/tags";
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
import React, { useContext, useState } from "react";
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
  const [sorterInputVisible, setSorterInputVisible] = useState<boolean>(false);
  const [sorterInputError, setSorterInputError] = useState<
    "" | "error" | "warning" | undefined
  >();
  const [sorterName, setSorterName] = useState<string>();
  const [sorterInputType, setSorterInputType] = useState<SortOrder>(
    SortOrder.Asc
  );

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
                  <Tags
                    tags={tags}
                    remove={remove}
                    push={push}
                    availableTags={availableTags}
                  />
                );
              }}
            />

            <FieldArray
              name="filter.attributes"
              render={({ remove, push }) => {
                return (
                  <Attributes
                    availableAttributes={availableAttributes}
                    attributes={attributes}
                    remove={remove}
                    push={push}
                  />
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
