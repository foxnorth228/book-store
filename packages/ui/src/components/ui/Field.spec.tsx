import { cleanup, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { Field } from "./Field";

afterEach(cleanup);

describe("Field", () => {
  it("renders with default orientation", () => {
    render(<Field data-testid="field">Content</Field>);

    const field = screen.getByTestId("field");

    expect(field.getAttribute("role")).toBe("group");
    expect(field.getAttribute("data-slot")).toBe("field");
    expect(field.getAttribute("data-orientation")).toBe("vertical");
  });

  it.each(["vertical", "horizontal", "responsive"] as const)(
    "supports %s orientation",
    (orientation) => {
      render(
        <Field orientation={orientation} data-testid="field">
          Content
        </Field>,
      );

      expect(screen.getByTestId("field").getAttribute("data-orientation")).toBe(orientation);
    },
  );

  it("renders custom className", () => {
    render(
      <Field className="custom-class" data-testid="field">
        Content
      </Field>,
    );

    expect(screen.getByTestId("field").classList.contains("custom-class")).toBe(true);
  });

  it("passes native div props", () => {
    render(
      <Field id="custom-field" title="Field title">
        Content
      </Field>,
    );

    const field = screen.getByRole("group");

    expect(field.id).toBe("custom-field");
    expect(field.getAttribute("title")).toBe("Field title");
  });

  it("supports data-invalid attribute", () => {
    render(
      <Field data-invalid="true" data-testid="field">
        Content
      </Field>,
    );

    expect(screen.getByTestId("field").getAttribute("data-invalid")).toBe("true");
  });
});

describe("Field.Set", () => {
  it("renders a fieldset", () => {
    render(
      <Field.Set>
        <Field.Legend>Personal information</Field.Legend>
      </Field.Set>,
    );

    expect(screen.getByText("Personal information").tagName).toBe("LEGEND");
    expect(screen.getByText("Personal information").closest("fieldset")).not.toBeNull();
  });

  it("supports custom className and native props", () => {
    render(
      <Field.Set className="custom-set" data-testid="field-set" disabled>
        Content
      </Field.Set>,
    );

    const fieldSet = screen.getByTestId("field-set");

    expect(fieldSet.tagName).toBe("FIELDSET");
    expect(fieldSet.classList.contains("custom-set")).toBe(true);
    expect((fieldSet as HTMLFieldSetElement).disabled).toBe(true);
  });
});

describe("Field.Legend", () => {
  it("uses legend variant by default", () => {
    render(<Field.Legend>Section title</Field.Legend>);

    expect(screen.getByText("Section title").getAttribute("data-variant")).toBe("legend");
  });

  it("supports label variant", () => {
    render(<Field.Legend variant="label">Section label</Field.Legend>);

    expect(screen.getByText("Section label").getAttribute("data-variant")).toBe("label");
  });
});

describe("Field.Group", () => {
  it("renders a group container", () => {
    render(
      <Field.Group data-testid="field-group">
        <Field>First</Field>
        <Field>Second</Field>
      </Field.Group>,
    );

    const group = screen.getByTestId("field-group");

    expect(group.getAttribute("data-slot")).toBe("field-group");
    expect(within(group).getAllByRole("group")).toHaveLength(2);
  });
});

describe("Field.Content", () => {
  it("renders content container", () => {
    render(
      <Field.Content data-testid="field-content">
        <Field.Title>Title</Field.Title>
        <Field.Description>Description</Field.Description>
      </Field.Content>,
    );

    expect(screen.getByTestId("field-content").getAttribute("data-slot")).toBe("field-content");
    expect(screen.getByText("Title")).toBeTruthy();
    expect(screen.getByText("Description")).toBeTruthy();
  });
});

describe("Field.Label", () => {
  it("renders a label with htmlFor", () => {
    render(
      <>
        <Field.Label htmlFor="email">Email</Field.Label>
        <input id="email" />
      </>,
    );

    const label = screen.getByText("Email");

    expect(label.tagName).toBe("LABEL");
    expect(label.getAttribute("for")).toBe("email");
  });
});

describe("Field.Title", () => {
  it("renders title content", () => {
    render(<Field.Title>Field title</Field.Title>);

    const title = screen.getByText("Field title");

    expect(title.getAttribute("data-slot")).toBe("field-label");
  });
});

describe("Field.Description", () => {
  it("renders description content", () => {
    render(<Field.Description>Help text</Field.Description>);

    const description = screen.getByText("Help text");

    expect(description.tagName).toBe("P");
    expect(description.getAttribute("data-slot")).toBe("field-description");
  });
});

describe("Field.Separator", () => {
  it("renders separator without content", () => {
    render(<Field.Separator data-testid="separator" />);

    const separator = screen.getByTestId("separator");

    expect(separator.getAttribute("data-slot")).toBe("field-separator");
    expect(separator.getAttribute("data-content")).toBe("false");
  });

  it("renders separator content", () => {
    render(<Field.Separator>Or continue with</Field.Separator>);

    expect(screen.getByText("Or continue with").getAttribute("data-slot")).toBe(
      "field-separator-content",
    );
  });
});

describe("Field.Error", () => {
  it("renders nothing when there are no errors", () => {
    const { container } = render(<Field.Error />);

    expect(container.firstChild).toBeNull();
  });

  it("renders nothing when errors array is empty", () => {
    const { container } = render(<Field.Error errors={[]} />);

    expect(container.firstChild).toBeNull();
  });

  it("renders a single error as text", () => {
    render(<Field.Error errors={[{ message: "Email is required" }]} />);

    const error = screen.getByRole("alert");

    expect(error.textContent).toBe("Email is required");
    expect(error.querySelector("ul")).toBeNull();
  });

  it("renders multiple errors as a list", () => {
    render(<Field.Error errors={[{ message: "First error" }, { message: "Second error" }]} />);

    const error = screen.getByRole("alert");
    const list = within(error).getByRole("list");

    expect(within(list).getAllByRole("listitem")).toHaveLength(2);
    expect(within(list).getByText("First error")).toBeTruthy();
    expect(within(list).getByText("Second error")).toBeTruthy();
  });

  it("removes duplicate errors by message", () => {
    render(
      <Field.Error
        errors={[
          { message: "Email is invalid" },
          { message: "Email is invalid" },
          { message: "Email is required" },
        ]}
      />,
    );

    const error = screen.getByRole("alert");

    expect(within(error).getAllByRole("listitem")).toHaveLength(2);
    expect(within(error).getAllByText("Email is invalid")).toHaveLength(1);
  });

  it("ignores errors without a message when rendering a list", () => {
    render(
      <Field.Error
        errors={[
          undefined,
          { message: "First error" },
          { message: undefined },
          { message: "Second error" },
        ]}
      />,
    );

    const error = screen.getByRole("alert");

    expect(within(error).getAllByRole("listitem")).toHaveLength(2);
  });

  it("renders children instead of errors when both are provided", () => {
    render(<Field.Error errors={[{ message: "Validation error" }]}>Custom error</Field.Error>);

    const error = screen.getByRole("alert");

    expect(error.textContent).toBe("Custom error");
    expect(screen.queryByText("Validation error")).toBeNull();
  });

  it("supports custom className and native props", () => {
    render(
      <Field.Error className="custom-error" data-testid="field-error">
        Error message
      </Field.Error>,
    );

    const error = screen.getByTestId("field-error");

    expect(error.getAttribute("role")).toBe("alert");
    expect(error.classList.contains("custom-error")).toBe(true);
  });
});

describe("Field compound API", () => {
  it("exposes all compound components", () => {
    expect(Field.Content).toBeDefined();
    expect(Field.Description).toBeDefined();
    expect(Field.Error).toBeDefined();
    expect(Field.Group).toBeDefined();
    expect(Field.Label).toBeDefined();
    expect(Field.Legend).toBeDefined();
    expect(Field.Separator).toBeDefined();
    expect(Field.Set).toBeDefined();
    expect(Field.Title).toBeDefined();
  });
});
