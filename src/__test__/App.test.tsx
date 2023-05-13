import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App", () => {
  test("renders main component", () => {
    render(<App />);

    const headingElem = screen.getByText(/taskify/i);
    expect(headingElem).toBeInTheDocument();

    const inputElem = screen.getByRole("textbox");
    expect(inputElem).toBeInTheDocument();

    const goButtonElem = screen.getByRole("button", {
      name: /go/i,
    });
    expect(goButtonElem).toBeInTheDocument();
  });
});
