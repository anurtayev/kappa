type Params = {
  currentValue: string;
  selectedTags: string[];
  availableTags: string[] | undefined;
  setNewValue: Function;
};

export const Tags = ({
  currentValue,
  selectedTags,
  availableTags,
  setNewValue,
}: Params) => {
  if (!availableTags) return null;

  const filteredSelections = availableTags
    .filter(
      (availableTag) =>
        !selectedTags.includes(availableTag) &&
        availableTag.startsWith(currentValue) &&
        availableTag !== currentValue
    )
    .sort();

  return filteredSelections.length > 1 ? (
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
