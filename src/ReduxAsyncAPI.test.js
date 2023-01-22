import { configureStore } from "@reduxjs/toolkit";
import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { Provider } from "react-redux";
import customCounterSlice from "./features/customCuounter/customCounterSlice";
import ReduxAsync from "./ReduxAsync";
import userEvent from "@testing-library/user-event";

// 代用されるAPIの定義
const server = setupServer(
  rest.get("https://jsonplaceholder.typicode.com/users/1", (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ username: "Bred dummy " }));
  })
);

// テストファイルの最初に1回実行される
beforeAll(() => server.listen());
// テストケースが終わる度に実行される
afterEach(() => {
  server.resetHandlers();
});
// テストファイルの最後に1回実行される
afterAll(() => {
  server.close();
});

describe("Redux ASync API Mocking", () => {
  let store;
  beforeEach(() => {
    store = configureStore({
      reducer: {
        customCounter: customCounterSlice,
      },
    });
  });
  it("[Fetch成功] h3タグにusernameが表示される", async () => {
    render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    );
    expect(screen.queryByRole("heading")).toBeNull();
    await userEvent.click(screen.getByText("FetchJSON"));
    expect(await screen.findByText("Bred dummy")).toBeInTheDocument();
  });

  it("[Fetch失敗] h3タグにanonymousが表示される", async () => {
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/users/1",
        (req, res, ctx) => {
          return res(ctx.status(404));
        }
      )
    );
    render(
      <Provider store={store}>
        <ReduxAsync />
      </Provider>
    );
    expect(screen.queryByRole("heading")).toBeNull();
    await userEvent.click(screen.getByText("FetchJSON"));
    expect(await screen.findByText("anonymous")).toBeInTheDocument();
  });
});
