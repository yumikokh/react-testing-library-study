import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { Provider } from "react-redux";
import customCounterSlice from "./features/customCuounter/customCounterSlice";
import Redux from "./Redux";

describe("Redux Integration Test", () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        customCounter: customCounterSlice,
      },
    });
  });

  it("Should display value with increment by 1 per count", async () => {
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    );
    await userEvent.click(screen.getByText("+"));
    await userEvent.click(screen.getByText("+"));
    await userEvent.click(screen.getByText("+"));
    expect(screen.getByTestId("count-value")).toHaveTextContent(3);
  });
  it("Should display value with decrement by 1 per count", async () => {
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    );
    await userEvent.click(screen.getByText("-"));
    await userEvent.click(screen.getByText("-"));
    expect(screen.getByTestId("count-value")).toHaveTextContent(-2);
  });
  it("Should display value with incrementByAmount", async () => {
    render(
      <Provider store={store}>
        <Redux />
      </Provider>
    );
    await userEvent.type(screen.getByPlaceholderText("Enter"), "30");
    await userEvent.click(screen.getByText("Increment By Amount"));
    expect(screen.getByTestId("count-value")).toHaveTextContent(30);
  });
});
