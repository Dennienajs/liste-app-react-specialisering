import React from "react";
import { render, cleanup } from "@testing-library/react";
import { App } from "../App";

// Tester om applicationen render.
// Selvom det virker dumt at teste dette, giver det virkelig meget test coverage ->
// Sammenlign evt billede 1 og 2 i './coverage-progress-pics'

beforeEach(cleanup); // Cleans the dom

describe("<App />", () => {
  it("renders the application", () => {
    const { queryByTestId } = render(<App />);
    expect(queryByTestId("application")).toBeTruthy();
  });
});
