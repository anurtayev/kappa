import { AttributeValueInput, MetaData } from "lib";
import { RequiredMetaData } from "./util";

export default function convertMetaDataToInput(
  input: MetaData | null | undefined
): RequiredMetaData {
  if (input === undefined || input === null)
    return { tags: [], attributes: [] };
  return {
    tags: input.tags || [],
    attributes:
      (input.attributes &&
        input.attributes?.reduce((previousValue, currentValue) => {
          return [
            ...previousValue,
            {
              value: currentValue.value,
              attribute: {
                name: currentValue.attribute.name,
                type: currentValue.attribute.type,
              },
            },
          ];
        }, [] as Array<AttributeValueInput>)) ||
      [],
  };
}
