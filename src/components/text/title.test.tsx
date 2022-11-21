import { render } from "@testing-library/react";
import { Title } from "./title";

describe("Title Component", () => {
  it("will show just text with value `Hello, I am title.`", () => {
    render(<Title>Hello, I am title.</Title>);
  });
});
