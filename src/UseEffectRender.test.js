import React from "react";
import { render, screen } from "@testing-library/react";
import UseEffectRender from "./UseEffectRender";

describe("useEffect rendering", () => {
  it("Should render only after async function resolved", async () => {
    render(<UseEffectRender />);
    expect(screen.queryByText(/I am/)).toBeNull();
    // findByText => テキストが見つかるまで非同期でまつ
    expect(await screen.findByText(/I am/)).toBeInTheDocument();
  });
});
