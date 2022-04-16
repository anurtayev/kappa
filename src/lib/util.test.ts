import {
  convertMetaDataToInput,
  cleanseMetaDataInput,
  RequiredMetaData,
  MetaDataInputOrUndefined,
} from "./util";
import { MetaData, MetaDataInput, InputType } from "lib";
import { AttributeValue, AttributeValueInput } from "./graphqlTypes";

describe("convertMetaDataToInput", () => {
  it("should convert MetaData to MetaDataInput correctly", () => {
    const testOutput: MetaData = {
      __typename: "MetaData",
      id: "media/681F4D6B-B69C-43F8-A364-68AE3C8AA1B4_1_105_c.jpeg",
      attributes: [
        {
          __typename: "AttributeValue",
          attribute: {
            __typename: "Attribute",
            name: "make",
            type: InputType.String,
          },
          value: "Apple",
        },
        {
          __typename: "AttributeValue",
          attribute: {
            __typename: "Attribute",
            name: "model",
            type: InputType.String,
          },
          value: "iPhone 11 Pro Max",
        },
        {
          __typename: "AttributeValue",
          attribute: {
            __typename: "Attribute",
            name: "width",
            type: InputType.Number,
          },
          value: "1024",
        },
        {
          __typename: "AttributeValue",
          attribute: {
            __typename: "Attribute",
            name: "height",
            type: InputType.Number,
          },
          value: "768",
        },
        {
          __typename: "AttributeValue",
          attribute: {
            __typename: "Attribute",
            name: "latitude",
            type: InputType.Number,
          },
          value: "10.528266666666667",
        },
        {
          __typename: "AttributeValue",
          attribute: {
            __typename: "Attribute",
            name: "longitude",
            type: InputType.Number,
          },
          value: "-85.74811666666666",
        },
        {
          __typename: "AttributeValue",
          attribute: {
            __typename: "Attribute",
            name: "dateCreated",
            type: InputType.String,
          },
          value: "2022-03-04T19:48:07.000Z",
        },
        {
          __typename: "AttributeValue",
          attribute: {
            __typename: "Attribute",
            name: "monthCreated",
            type: InputType.Number,
          },
          value: "3",
        },
        {
          __typename: "AttributeValue",
          attribute: {
            __typename: "Attribute",
            name: "yearCreated",
            type: InputType.Number,
          },
          value: "2022",
        },
        {
          __typename: "AttributeValue",
          attribute: {
            __typename: "Attribute",
            name: "size",
            type: InputType.Number,
          },
          value: "197789",
        },
        {
          __typename: "AttributeValue",
          attribute: {
            __typename: "Attribute",
            name: "extension",
            type: InputType.String,
          },
          value: "jpeg",
        },
      ],
      tags: null,
    };

    const testInput: MetaDataInput = {
      attributes: [
        {
          attribute: {
            name: "make",
            type: InputType.String,
          },
          value: "Apple",
        },
        {
          attribute: {
            name: "model",
            type: InputType.String,
          },
          value: "iPhone 11 Pro Max",
        },
        {
          attribute: {
            name: "width",
            type: InputType.Number,
          },
          value: "1024",
        },
        {
          attribute: {
            name: "height",
            type: InputType.Number,
          },
          value: "768",
        },
        {
          attribute: {
            name: "latitude",
            type: InputType.Number,
          },
          value: "10.528266666666667",
        },
        {
          attribute: {
            name: "longitude",
            type: InputType.Number,
          },
          value: "-85.74811666666666",
        },
        {
          attribute: {
            name: "dateCreated",
            type: InputType.String,
          },
          value: "2022-03-04T19:48:07.000Z",
        },
        {
          attribute: {
            name: "monthCreated",
            type: InputType.Number,
          },
          value: "3",
        },
        {
          attribute: {
            name: "yearCreated",
            type: InputType.Number,
          },
          value: "2022",
        },
        {
          attribute: {
            name: "size",
            type: InputType.Number,
          },
          value: "197789",
        },
        {
          attribute: {
            name: "extension",
            type: InputType.String,
          },
          value: "jpeg",
        },
      ],
      tags: [],
    };

    expect(convertMetaDataToInput(testOutput)).toEqual(testInput);
  });

  it("should return empty object with empty arrays for tags and attributes when there is no MetaData", () => {
    const emptyInput = { tags: [], attributes: [] };
    expect(convertMetaDataToInput(null)).toEqual(emptyInput);
    expect(convertMetaDataToInput(undefined)).toEqual(emptyInput);
  });

  it("should return empty array for attributes when they are falsey", () => {
    const tags = ["t1"];
    const meta: MetaData = {
      __typename: "MetaData",
      id: "media/681F4D6B-B69C-43F8-A364-68AE3C8AA1B4_1_105_c.jpeg",
      tags,
    };
    expect(convertMetaDataToInput(meta)).toEqual({
      tags,
      attributes: [],
    });
  });
});

describe("cleanseMetaDataInput", () => {
  it("should return undefined if tags and attributes are empty arrays", () => {
    const meta: RequiredMetaData = { tags: [], attributes: [] };
    expect(cleanseMetaDataInput(meta)).toBeUndefined();
  });

  it("should return tags undefined if it is empty array", () => {
    const attributes: AttributeValueInput[] = [
      {
        attribute: { name: "name", type: InputType.String },
        value: "value",
      },
    ];
    const meta: RequiredMetaData = { tags: [], attributes };
    const metaResult: MetaDataInputOrUndefined = { attributes };
    expect(cleanseMetaDataInput(meta)).toEqual(metaResult);
  });

  it("should return attribute undefined if it is empty array", () => {
    const tags: string[] = ["name"];
    const meta: RequiredMetaData = { tags, attributes: [] };
    const metaResult: MetaDataInputOrUndefined = { tags };
    expect(cleanseMetaDataInput(meta)).toEqual(metaResult);
  });
});
