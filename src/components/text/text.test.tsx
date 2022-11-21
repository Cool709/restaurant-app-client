import { render } from "@testing-library/react";
import { Text } from "./text";

describe("Normal Text", () => {
  it("will show just text with value `Hello, I am text.`", () => {
    render(<Text>Hello, I am text.</Text>);
  });
});
