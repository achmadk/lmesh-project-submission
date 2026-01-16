import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Form } from "./Form";

describe("Form Provider Component", () => {
  it("renders the form provider component", () => {
    const test = render(<Form onSubmit={console.log} />);
    const form = test.container.querySelector("form");
    expect(form).toMatchSnapshot();
    test.unmount();
  });
});
