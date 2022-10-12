import { Button, Card, Select, Space } from "antd";
import { AsyncImage } from "features/asyncImage";
import { Attributes } from "features/attributes";
import { Tags } from "features/tags";
import { FieldArray, Formik } from "formik";
import {
  Attribute,
  attributeSchema,
  AttributeValueInput,
  InputType,
  isFolder,
  Maybe,
  MetaData,
  Scalars,
  tagSchema,
  UpdateMetaDataMutationFn,
} from "lib";
import { useRef, useState } from "react";
import { NavigateFunction } from "react-router-dom";
import { array, object } from "yup";

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
      {({ values: { tags, attributes }, isSubmitting, submitForm }) => {
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

            <FieldArray
              name="tags"
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
              name="attributes"
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
