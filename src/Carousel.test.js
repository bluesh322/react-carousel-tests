import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it("smoke test Carousel component", () => {
  render(<Carousel />);
});

it("snapshot test for Carousel component", () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).not.toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).toBeInTheDocument();
});

it("works when you click the left arrow by going to the previous image", () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // render -> click right arrow, which then enables click of left arrow
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect 2nd photo to be rendered
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).not.toBeInTheDocument();

  // click left arrow, go to previous
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(
    queryByAltText("Photo by Richard Pasquarella on Unsplash")
  ).toBeInTheDocument();
  expect(
    queryByAltText("Photo by Pratik Patel on Unsplash")
  ).not.toBeInTheDocument();

});

it("works, right arrow no longer rendered when at the end of images", () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
    // render -> click right arrow, which then enables click of left arrow
  const rightArrow = queryByTestId("right-arrow");
  expect(rightArrow).toBeInTheDocument();
  fireEvent.click(rightArrow);
  expect(rightArrow).toBeInTheDocument();

  fireEvent.click(rightArrow);

  // Now the arrow should no longer be rendered.
  // const rightArrow = queryByTestId("right-arrow");
  expect(rightArrow).not.toBeInTheDocument();
  
});

it("works, left arrow no longer rendered when at the beginning of images", () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
    // left arrow will not be rendered on load.
    const leftArrow = queryByTestId("left-arrow");
    expect(leftArrow).not.toBeInTheDocument();

    // go next and then previous, check again.
    const rightArrow = queryByTestId("right-arrow");
    fireEvent.click(rightArrow);

    // I need to attempt to grab it again as it is now rendered.
    const leftArrowAfterChange = queryByTestId("left-arrow");
    expect(leftArrowAfterChange).toBeInTheDocument();

    // Check left arrow is again not rendered on first image
    fireEvent.click(leftArrowAfterChange);
    expect(leftArrowAfterChange).not.toBeInTheDocument();
  
});