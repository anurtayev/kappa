import { AttributeInput } from "lib";

type Params = {
  attributes: AttributeInput[] | undefined;
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
            onClick={() => onClick(attribute)}
          >
            {attribute.name}
          </button>
        );
      })}
    </div>
  ) : null;
