import React from "react";
import { FieldArray, Field, useFormikContext } from "formik";
import styled from "styled-components";

import { Characters, FormBrick, SmallButton } from "lib";
import { Selections } from "./Selections";

type Params = { availableTags: string[]; availableAttributes: string[] };

const cleanse = (value: string): string => value.trim().toLowerCase();

export const MetaDataPartialForm = ({
  availableTags,
  availableAttributes,
}: Params) => {
  const {
    values: { tags, attributes, newTag, newKey, newValue },
    setFieldValue,
  } = useFormikContext<{
    tags: [];
    attributes: [];
    newTag: "";
    newKey: "";
    newValue: "";
  }>();

  return (
    <>
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
                selections={availableTags.filter((availableTag) => true)}
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
                  attributes.map((attribute: string[], index: number) => (
                    <FormBrick key={index}>
                      <ElemBox>{attribute[0]}</ElemBox>
                      <StyledField
                        name={`attributes.${index}.1`}
                        value={attribute[1]}
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
                        (attribute) => attribute[0] === newKeyValue
                      )
                    )
                      push([newKeyValue, cleanse(newValue)]);
                    setFieldValue("newKey", "");
                    setFieldValue("newValue", "");
                  }}
                >
                  {Characters.plus}
                </SmallButton>
              </FormBrick>
              <Selections
                currentValue={newKey}
                selections={availableAttributes.filter(
                  (availableAttribute) => attributes && attributes.length
                )}
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

const SectionHeader = styled.h5`
  color: #1187f6;
  margin: 0 0 0.2rem 0;
`;

const ElemBox = styled.div`
  border: 1px solid;
  padding: 0 0.2rem 0 0.2rem;
  background: lightgrey;
  height: 1rem;
  font-size: 0.75rem;
`;

const ExistingItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledField = styled(Field)`
  height: 0.76rem;
  width: 40%;
`;
