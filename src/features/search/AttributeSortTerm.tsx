import { AttributeInput } from "lib";

type Params = {
  attributes: AttributeInput[] | undefined;
  push: (obj: any) => void;
};

export const AttributeSortTerm = ({ attributes, push }: Params) =>
  attributes?.length ? (
    <div>
      {attributes.map((attribute) => (
        <button
          key={attribute.name}
          type="button"
          onClick={() => {
            push(attribute);
          }}
        >
          {attribute.name}
        </button>
      ))}
    </div>
  ) : null;
