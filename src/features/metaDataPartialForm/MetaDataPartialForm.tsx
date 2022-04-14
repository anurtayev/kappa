import { Attribute, AttributeValue } from "@aspan/sigma/lib";
import { Field, FieldArray, useFormikContext } from "formik";
import {
  Characters,
  FormBrick,
  FormikMetaData,
  InputType,
  SmallButton,
} from "lib";
import { AvailableAttributes } from "./AvailableAttributes";
import { Selections } from "./Selections";
import {
  ElemBox,
  ExistingItemsContainer,
  SectionHeader,
  StyledField,
  ElemBoxValue,
} from "./styles";

const cleanse = (value: string): string => value.trim().toLowerCase();

const optionStringSelected = (
  <option value={InputType.String} selected>
    {InputType.String}
  </option>
);
const optionStringNotSelected = (
  <option value={InputType.String}>{InputType.String}</option>
);
const optionNumberSelected = (
  <option value={InputType.Number} selected>
    {InputType.Number}
  </option>
);
const optionNumberNotSelected = (
  <option value={InputType.Number}>{InputType.Number}</option>
);

export const MetaDataPartialForm = () => {
  const {
    values: {
      metaData: { tags, attributes },
      newTag,
      newKey,
      newValueStr,
      newType,
      availableMetaData: {
        tags: availableTags,
        attributes: availableAttributes,
      },
    },
    setFieldValue,
  } = useFormikContext<FormikMetaData>();

  return (
    <>
      <div>
        <SectionHeader>Tags</SectionHeader>
        <FieldArray
          name="metaData.tags"
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
                <StyledField name="newTag" autoComplete="off" />
                <SmallButton
                  onClick={() => {
                    const newTagValue = cleanse(newTag);
                    push(newTagValue);
                    setFieldValue("newTag", "");
                  }}
                >
                  {Characters.plus}
                </SmallButton>
              </FormBrick>
              <Selections
                currentValue={newTag}
                selections={availableTags.filter((availableTag) =>
                  availableTag.startsWith(newTag)
                )}
                setNewValue={(selectedValue: string) => push(selectedValue)}
              />
            </>
          )}
        />
      </div>

      <div>
        <SectionHeader>Attributes</SectionHeader>
        <FieldArray
          name="metaData.attributes"
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
                <StyledField name="newKey" autoComplete="off" />
                <Field as="select" name="newType">
                  {newType === InputType.String
                    ? optionStringSelected
                    : optionStringNotSelected}
                  {newType === InputType.Number
                    ? optionNumberSelected
                    : optionNumberNotSelected}
                </Field>
                <StyledField name="newValueStr" />
                <SmallButton
                  onClick={() => {
                    const newKeyValue = cleanse(newKey);
                    if (
                      !attributes?.find(
                        (attributeValue) =>
                          attributeValue.attribute.name === newKeyValue
                      )
                    )
                      push({
                        __typename: "AttributeValue",
                        attribute: { name: newKeyValue, type: newType },
                        value: cleanse(newValueStr),
                      } as AttributeValue);
                    setFieldValue("newKey", "");
                    setFieldValue("newValueStr", "");
                    setFieldValue("newType", InputType.String);
                  }}
                >
                  {Characters.plus}
                </SmallButton>
              </FormBrick>
              <AvailableAttributes
                currentValue={
                  {
                    __typename: "Attribute",
                    name: newKey,
                    type: newType,
                  } as Attribute
                }
                availableAttributes={availableAttributes.filter((attribute) =>
                  attribute.name.startsWith(newKey)
                )}
                setNewValue={(selectedValue: Attribute) => {
                  setFieldValue("newKey", selectedValue.name);
                  setFieldValue("newType", selectedValue.type);
                }}
              />
            </>
          )}
        />
      </div>
    </>
  );
};
