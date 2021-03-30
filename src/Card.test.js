import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Card from "./Card";

it("smoke test Carousel component", () => {
  render(<Card/>);
});

it("snapshot test for Carousel component", () => {
    const {asFragment} = render(<Card />);
    expect(asFragment()).toMatchSnapshot();
  })