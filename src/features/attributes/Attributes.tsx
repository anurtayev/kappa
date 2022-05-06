import { Attribute, AttributeInput } from "lib";

type Params = {
  attributes: Attribute[] | undefined;
  onClick: (attribute: AttributeInput) => void;
};

export const Attributes = ({ attributes, onClick }: Params) =>
  attributes?.length ? (
    <div>
      {attributes.map((attribute) => {
        return (
          <button
            key={attribute.name}
            type="button"
            onClick={() =>
              onClick({ name: attribute.name, type: attribute.type })
            }
          >
            {attribute.name}
          </button>
        );
      })}
    </div>
  ) : null;
