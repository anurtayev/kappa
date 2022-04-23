import { AttributeInput } from "lib";

type Params = {
  currentValue: AttributeInput;
  availableAttributes: AttributeInput[];
  setNewValue: Function;
};

export const AvailableAttributes = ({
  currentValue,
  availableAttributes,
  setNewValue,
}: Params) => {
  const filteredSelections = availableAttributes
    .sort()
    .filter(
      (selection) =>
        selection.name.includes(currentValue.name) &&
        selection.name !== currentValue.name
    );

  return filteredSelections.length > 1 ||
    (filteredSelections.length === 1 &&
      filteredSelections[0].name !== currentValue.name) ? (
    <div>
      {filteredSelections.map((selection) => (
        <button
          key={selection.name}
          type="button"
          onClick={(e) => {
            setNewValue(selection);
          }}
        >
          {selection.name}
        </button>
      ))}
    </div>
  ) : null;
};
