import { AttributeValueInput, InputType, MetaDataInput } from "lib";

export type MetaDataInputOrUndefined = MetaDataInput | undefined;
export const cleanseMetaDataInput = ({
  tags,
  attributes,
}: RequiredMetaData): MetaDataInputOrUndefined => {
  return {
    tags: (tags.length && tags) || null,
    attributes: (attributes.length && attributes) || null,
  };
};

export interface FormikMetaData {
  metaDataInput: RequiredMetaData;
  newTag: string;
  newKey: string;
  newValueStr: string;
  newType: InputType;
}

export type RequiredMetaData = {
  attributes: Array<AttributeValueInput>;
  tags: Array<string>;
};
