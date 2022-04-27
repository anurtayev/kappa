import { Attribute, AttributeValue, AttributeInput } from "@aspan/sigma/lib";
import { Field, FieldArray, useFormikContext } from "formik";
import {
  AttributeValueInput,
  Characters,
  FormBrick,
  FormikMetaData,
  InputType,
  SmallButton,
} from "lib";
import { Attributes } from "../../attributes/Attributes";
import { Tags } from "features/tags";
import {
  ElemBox,
  ExistingItemsContainer,
  SectionHeader,
  StyledField,
  ElemBoxValue,
} from "./styles";

const cleanse = (value: string): string => value.trim().toLowerCase();

type MetaDataPartialFormParams = {
  availableTags: Array<string> | undefined;
  availableAttributes: Array<AttributeInput> | undefined;
};

export const MetaDataPartialForm = ({
  availableAttributes,
  availableTags,
}: MetaDataPartialFormParams) => {
  const {
    values: {
      metaDataInput: { tags, attributes },
      newTag,
      newKey,
      newValueStr,
      newType,
    },
    setFieldValue,
  } = useFormikContext<FormikMetaData>();

  return (
    <>
      <div>
        <SectionHeader>Tags</SectionHeader>
        <FieldArray
          name="metaDataInput.tags"
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
              <Tags
                currentValue={newTag}
                availableTags={availableTags}
                selectedTags={tags}
                setNewValue={(selectedValue: string) => push(selectedValue)}
              />
            </>
          )}
        />
      </div>

      <div>
        <SectionHeader>Attributes</SectionHeader>
        <FieldArray
          name="metaDataInput.attributes"
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
                <Field as="select" name="newType" value={newType}>
                  <option value={InputType.String}>{InputType.String}</option>
                  <option value={InputType.Number}>{InputType.Number}</option>
                </Field>
                <StyledField name="newValueStr" />
                <SmallButton
                  onClick={() => {
                    const cleansedKey = cleanse(newKey);
                    if (
                      !attributes?.find(
                        (attributeValue) =>
                          attributeValue.attribute.name === cleansedKey
                      )
                    )
                      push({
                        attribute: { name: cleansedKey, type: newType },
                        value: cleanse(newValueStr),
                      } as AttributeValueInput);
                    setFieldValue("newKey", "");
                    setFieldValue("newValueStr", "");
                    setFieldValue("newType", InputType.String);
                  }}
                >
                  {Characters.plus}
                </SmallButton>
              </FormBrick>
              <Attributes
                currentValue={
                  {
                    name: newKey,
                    type: newType,
                  } as AttributeInput
                }
                availableAttributes={(availableAttributes || []).filter(
                  (attribute) => attribute.name.startsWith(newKey)
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
