import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import customCounterSlice from "./features/customCuounter/customCounterSlice";
import ReduxAsync from "./ReduxAsync";
import userEvent from "@testing-library/user-event";

describe("ReduxAsync test", () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        customCounter: customCounterSlice,
      },
    });
  });

  it("Should display value with 100 + payload", async () => {
    render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    );
    await userEvent.click(screen.getByText("FetchDummy"));
    expect(await screen.findByText("105")).toBeTruthy();
  });
});
