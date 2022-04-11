import { FieldArray, useFormikContext } from "formik";

import { Characters, FormBrick, SmallButton } from "lib";
import { FormikMetaData } from "lib";

import { Selections } from "./Selections";
import { AttributeValue } from "@aspan/sigma/lib";
import {
  SectionHeader,
  ElemBox,
  ExistingItemsContainer,
  StyledField,
} from "./styles";

const cleanse = (value: string): string => value.trim().toLowerCase();

export const MetaDataPartialForm = () => {
  const {
    values: {
      metaData: { tags, attributes },
      newTag,
      newKey,
      newValueStr,
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
          name="attributes"
          render={({ remove, push }) => (
            <>
              <ExistingItemsContainer>
                {attributes &&
                  attributes.map((attribute: AttributeValue, index: number) => (
                    <FormBrick key={index}>
                      <ElemBox>{attribute.attribute.name}</ElemBox>
                      <StyledField
                        name={`attributes.${index}.1`}
                        value={attribute.value}
                      />
                      <SmallButton onClick={() => remove(index)}>
                        {Characters.multiply}
                      </SmallButton>
                    </FormBrick>
                  ))}{" "}
              </ExistingItemsContainer>

              <FormBrick>
                <StyledField name="newKey" autoComplete="off" />
                <StyledField name="newValue" />
                <SmallButton
                  onClick={() => {
                    const newKeyValue = cleanse(newKey);
                    if (
                      !attributes?.find(
                        (attributeValue) =>
                          attributeValue.attribute.name === newKeyValue
                      )
                    )
                      push([newKeyValue, cleanse(newValueStr)]);
                    setFieldValue("newKey", "");
                    setFieldValue("newValueStr", "");
                  }}
                >
                  {Characters.plus}
                </SmallButton>
              </FormBrick>
              <Selections
                currentValue={newKey}
                selections={availableAttributes
                  .filter((availableAttribute) => attributes?.length)
                  .map((availableAttribute) => availableAttribute.name)}
                setNewValue={(selectedValue: string) =>
                  setFieldValue("newKey", selectedValue)
                }
              />
            </>
          )}
        />
      </div>
    </>
  );
};
