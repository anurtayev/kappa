import { FieldArray, useFormikContext, Field } from "formik";
import { AttributeValue } from "@aspan/sigma/lib";

import {
  Characters,
  FormBrick,
  SmallButton,
  FormikMetaData,
  InputType,
} from "lib";

import { Selections } from "./Selections";
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
      newType,
      availableMetaData: {
        tags: availableTags,
        attributes: availableAttributes,
      },
    },
    setFieldValue,
  } = useFormikContext<FormikMetaData>();

  console.log("==> MetaDataPartialForm newType", newType);

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
          name="metadata.attributes"
          render={({ remove, push }) => (
            <>
              <ExistingItemsContainer>
                {attributes &&
                  attributes.map(
                    (attributeValue: AttributeValue, index: number) => (
                      <FormBrick key={index}>
                        <ElemBox>{attributeValue.attribute.name}</ElemBox>
                        <StyledField
                          name={`metadata.attributes.${index}.value`}
                          value={attributeValue.value}
                        />
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
                  <option value={"STRING"} selected={newType === "STRING"}>
                    {"STRING"}
                  </option>
                  <option value={"NUMBER"} selected={newType === "NUMBER"}>
                    {"NUMBER"}
                  </option>
                </Field>
                <StyledField name="newValueStr" />
                <SmallButton
                  onClick={() => {
                    console.log(
                      "==> new attribute:",
                      newKey,
                      newType,
                      newValueStr
                    );

                    const newKeyValue = cleanse(newKey);
                    if (
                      !attributes?.find(
                        (attributeValue) =>
                          attributeValue.attribute.name === newKeyValue
                      )
                    )
                      push({
                        attribute: { name: newKeyValue, type: newType },
                        value: cleanse(newValueStr),
                      });
                    setFieldValue("newKey", "");
                    setFieldValue("newValueStr", "");
                    setFieldValue("newType", "STRING");
                  }}
                >
                  {Characters.plus}
                </SmallButton>
              </FormBrick>
              <Selections
                currentValue={newKey}
                selections={availableAttributes
                  .filter((attribute) => attribute.name.startsWith(newKey))
                  .map((attribute) => attribute.name)}
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
