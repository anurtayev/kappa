import { Attributes } from "features/attributes";
import { Tags } from "features/tags";
import { Field, FieldArray, Formik } from "formik";
import {
  Attribute,
  AttributeValue,
  AttributeValueInput,
  Characters,
  FormBrick,
  getMediaName,
  InputType,
  isFolder,
  Maybe,
  MetaData,
  Scalars,
  SmallButton,
  UpdateMetaDataMutationFn,
} from "lib";
import { NavigateFunction } from "react-router-dom";
import { array, mixed, object, string } from "yup";
import {
  ButtonContainer,
  ElemBox,
  ElemBoxValue,
  EntryName,
  ExistingItemsContainer,
  FlexForm,
  Frame,
  HeaderContainer,
  SectionHeader,
  SubmitButton,
} from "./styles";

const attributeInputInitValue: AttributeValueInput = {
  attribute: { name: "", type: InputType.String },
  value: "",
};

const tagSchema = string().trim().required();

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
}: MetaDataInputFormParams) => (
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
    }) => (
      <FlexForm>
        <HeaderContainer>
          <span>{isFolder(id) ? Characters.folder : Characters.file}</span>
          <EntryName>{getMediaName(id)}</EntryName>
        </HeaderContainer>

        <Frame
          thumbImageUrl={`${process.env.REACT_APP_CLOUDFRONT_URL}/resizer?key=${id}&width=${process.env.REACT_APP_ICON_WIDTH}&height=${process.env.REACT_APP_ICON_HEIGHT}`}
        />

        <div>
          <SectionHeader>Tags</SectionHeader>
          <FieldArray
            name="tags"
            render={({ remove, push }) => (
              <>
                <ExistingItemsContainer>
                  {tags &&
                    tags.map((tag: string, index: number) => (
                      <FormBrick key={index}>
                        <ElemBox>{tag}</ElemBox>
                        <SmallButton onClick={() => remove(index)}>
                          {Characters.multiply}
                        </SmallButton>
                      </FormBrick>
                    ))}
                </ExistingItemsContainer>

                <FormBrick>
                  <Field name="tagInput" autoComplete="off" />
                  <button
                    type="button"
                    onClick={() => setFieldValue("tagInput", "")}
                  >
                    {Characters.multiply}
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      if (await tagSchema.isValid(tagInput)) {
                        push(tagInput);
                        setFieldValue("tagInput", "");
                      }
                    }}
                  >
                    {Characters.check}
                  </button>
                </FormBrick>
                <Tags
                  tags={availableTags
                    ?.filter(
                      (availableTag) =>
                        !tags.includes(availableTag) &&
                        availableTag.startsWith(tagInput) &&
                        availableTag !== tagInput
                    )
                    .sort()}
                  onClick={(tag) => {
                    push(tag);
                  }}
                />
              </>
            )}
          />
        </div>

        <div>
          <SectionHeader>Attributes</SectionHeader>
          <FieldArray
            name="attributes"
            render={({ remove, push }) => (
              <>
                <ExistingItemsContainer>
                  {attributes &&
                    attributes.map(
                      (attributeValue: AttributeValue, index: number) => (
                        <FormBrick key={index}>
                          <ElemBox>{attributeValue.attribute.name}</ElemBox>
                          <ElemBoxValue>{attributeValue.value}</ElemBoxValue>
                          <SmallButton onClick={() => remove(index)}>
                            {Characters.multiply}
                          </SmallButton>
                        </FormBrick>
                      )
                    )}{" "}
                </ExistingItemsContainer>

                <FormBrick>
                  <Field name="attributeInput.attribute.name" />
                  <Field name="attributeInput.attribute.type" as="select">
                    <option value={InputType.String}>{InputType.String}</option>
                    <option value={InputType.Number}>{InputType.Number}</option>
                  </Field>
                  <Field name="attributeInput.value" />
                  <button
                    type="button"
                    onClick={() =>
                      setFieldValue("attributeInput", attributeInputInitValue)
                    }
                  >
                    {Characters.multiply}
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      if (
                        (await attributeSchema.isValid(attributeInput)) &&
                        !attributes?.find(
                          (attributeValue) =>
                            attributeValue.attribute.name ===
                            attributeInput.attribute.name
                        )
                      ) {
                        push(attributeInput);
                        setFieldValue(
                          "attributeInput",
                          attributeInputInitValue
                        );
                      }
                    }}
                  >
                    {Characters.check}
                  </button>
                </FormBrick>
                <Attributes
                  attributes={availableAttributes
                    ?.filter(
                      (availableAttribute) =>
                        !attributes.find(
                          (attribute) =>
                            attribute.attribute.name === availableAttribute.name
                        ) &&
                        availableAttribute.name.includes(
                          attributeInput.attribute.name
                        ) &&
                        availableAttribute.name !==
                          attributeInput.attribute.name
                    )
                    .sort()}
                  onClick={(attribute) => {
                    setFieldValue("attributeInput", {
                      attribute,
                      value: "",
                    });
                  }}
                />
              </>
            )}
          />
        </div>

        <ButtonContainer>
          <SubmitButton type="submit" disabled={isSubmitting}>
            Submit
          </SubmitButton>
          <button type="button" onClick={() => navigate(-1)}>
            Cancel
          </button>
        </ButtonContainer>
      </FlexForm>
    )}
  </Formik>
);
