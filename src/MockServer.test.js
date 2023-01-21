import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { rest } from "msw";
import { setupServer } from "msw/node";
import MockServer from "./MockServer";

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

describe("Mocking API", () => {
  it("[Fetch Success] データが正しくフェッチされてボタンがdisabledになる", async () => {
    render(<MockServer />);
    await userEvent.click(screen.getByRole("button"));
    expect(await screen.findByRole("heading")).toHaveTextContent("Bred dummy");
    expect(screen.getByRole("button")).toHaveAttribute("disabled");
  });

  it("[Fetch failure] エラーメッセージが表示されボタンが有効化される", async () => {
    // レスポンスを書き換える、このitの中でのみ有効
    server.use(
      rest.get(
        "https://jsonplaceholder.typicode.com/users/1",
        (req, res, ctx) => {
          return res(ctx.status(404));
        }
      )
    );
    render(<MockServer />);
    await userEvent.click(screen.getByRole("button"));
    expect(await screen.findByTestId("error")).toHaveTextContent(
      "Fetching Failed!"
    );
    expect(screen.queryByRole("heading")).toBeNull();
    expect(screen.getByRole("button")).not.toHaveAttribute("disabled");
  });
});
