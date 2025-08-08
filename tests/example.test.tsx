import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "../src/components/Button";

describe("test", () => {
  it("example1", () => {
    expect(1 + 1).toBe(2);
  });
});

describe("Hello component", () => {
  it("renders the name prop", () => {
    render(<Button />);
    expect(screen.getByText("I am the button")).toBeInTheDocument();
  });
});
