import { sortSearchInput } from "./sortSearchInput";
import { SearchInput, SortOrder } from "graphql";

describe("sortSearchInput", () => {
  const searchInput: SearchInput = {
    attributesFilter: [
      ["velo", "1"],
      ["moto", "2"],
      ["aero", "3"],
      ["zoo", "4"],
    ],
    attributesSorter: [{ attribute: "velo", sortOrder: SortOrder.Asc }],
    tagsFilter: ["tag1", "tag0", "repo", "alabama"],
  };
  const expectedSearchInput: SearchInput = {};

  test("should return correct value", () => {
    expect(sortSearchInput(searchInput)).toEqual(expectedSearchInput);
  });
});
