import React from "react";

type Params = {
  currentValue: string;
  selections: string[];
  setNewValue: Function;
};

export const Selections = ({
  currentValue,
  selections,
  setNewValue,
}: Params) => {
  const filteredSelections = selections
    .sort()
    .filter(
      (selection) =>
        selection.includes(currentValue) && selection !== currentValue
    );

  return filteredSelections.length > 1 ||
    (filteredSelections.length === 1 &&
      filteredSelections[0] !== currentValue) ? (
    <div>
      {filteredSelections.map((selection) => (
        <button
          key={selection}
          type="button"
          onClick={(e) => {
            setNewValue(selection);
          }}
        >
          {selection}
        </button>
      ))}
    </div>
  ) : null;
};
