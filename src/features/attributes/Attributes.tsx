import { AttributeInput, AttributeValueInput } from "lib";

type Params = {
  attributes: AttributeInput[] | undefined;
  push: (obj: any) => void;
};

export const Attributes = ({ attributes, push }: Params) =>
  attributes?.length ? (
    <div>
      {attributes.map((attribute) => {
        return (
          <button
            key={attribute.name}
            type="button"
            onClick={() => {
              const attributeValueInput: AttributeValueInput = {
                attribute,
                value: "",
              };
              push(attributeValueInput);
            }}
          >
            {attribute.name}
          </button>
        );
      })}
    </div>
  ) : null;
