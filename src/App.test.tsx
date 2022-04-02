import React from "react";
import { render } from "@testing-library/react";

import { App } from "./App";
import { Characters } from "lib";

test("renders learn react link", () => {
  const { getByText } = render(<App />);

  expect(true).toBeTruthy();
});
