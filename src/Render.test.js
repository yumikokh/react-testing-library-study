import React from "react";
import { render, screen } from "@testing-library/react";
import Render from "./Render";

// describe => いくつかの関連するテストをまとめたブロックを作成
describe("Rendering", () => {
  // it => test関数と同様
  it("Should Render all the elements correctly", () => {
    render(<Render />);
    // screen.debug();
    // https://github.com/A11yance/aria-query#elements-to-roles
    expect(screen.getByRole("heading")).toBeTruthy();
    expect(screen.getByRole("textbox")).toBeTruthy();
    expect(screen.getAllByRole("button")[0]).toBeTruthy();
    expect(screen.getAllByRole("button")[1]).toBeTruthy();
    expect(screen.getByText("Udemy")).toBeTruthy();
    // ないことを証明したい、getByTextだとエラーになる
    expect(screen.queryByText("Udeeemy")).toBeNull();
    expect(screen.getByTestId("copyright")).toBeTruthy();
  });
});
