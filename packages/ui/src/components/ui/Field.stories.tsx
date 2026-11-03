import type { Meta, StoryObj } from "@storybook/react";

import { Field } from "./Field";

const meta = {
  title: "UI/Field",
  component: Field,
  tags: ["autodocs"],
  args: {
    orientation: "vertical",
  },
  argTypes: {
    orientation: {
      control: "select",
      options: ["vertical", "horizontal", "responsive"],
    },
  },
} satisfies Meta<typeof Field>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <Field {...args}>
      <Field.Label htmlFor="default-input">Email</Field.Label>
      <input
        id="default-input"
        type="email"
        placeholder="Enter your email"
        className="border-input h-9 rounded-md border px-3 text-sm"
      />
      <Field.Description>We will never share your email with anyone.</Field.Description>
    </Field>
  ),
};

export const Orientations: Story = {
  render: () => (
    <div className="flex w-full max-w-xl flex-col gap-8">
      <Field orientation="vertical">
        <Field.Label htmlFor="vertical-input">Vertical</Field.Label>
        <input
          id="vertical-input"
          className="border-input h-9 rounded-md border px-3 text-sm"
          placeholder="Vertical orientation"
        />
        <Field.Description>Label and control are arranged vertically.</Field.Description>
      </Field>

      <Field orientation="horizontal">
        <Field.Label htmlFor="horizontal-input">Horizontal</Field.Label>
        <input
          id="horizontal-input"
          className="border-input h-9 min-w-0 flex-1 rounded-md border px-3 text-sm"
          placeholder="Horizontal orientation"
        />
      </Field>

      <Field orientation="responsive">
        <Field.Label htmlFor="responsive-input">Responsive</Field.Label>
        <input
          id="responsive-input"
          className="border-input h-9 min-w-0 flex-1 rounded-md border px-3 text-sm"
          placeholder="Responsive orientation"
        />
        <Field.Description>Changes orientation depending on the container width.</Field.Description>
      </Field>
    </div>
  ),
};

export const WithContent: Story = {
  render: () => (
    <Field className="max-w-md">
      <Field.Content>
        <Field.Label htmlFor="content-input">Project name</Field.Label>
        <Field.Description>Choose a name that clearly identifies your project.</Field.Description>
      </Field.Content>

      <input
        id="content-input"
        className="border-input h-9 rounded-md border px-3 text-sm"
        placeholder="My project"
      />
    </Field>
  ),
};

export const WithTitle: Story = {
  render: () => (
    <Field className="max-w-md">
      <Field.Content>
        <Field.Title>Notifications</Field.Title>
        <Field.Description>Choose which notifications you want to receive.</Field.Description>
      </Field.Content>
    </Field>
  ),
};

export const Invalid: Story = {
  render: () => (
    <Field data-invalid="true" className="max-w-md">
      <Field.Label htmlFor="invalid-input">Email</Field.Label>
      <input
        id="invalid-input"
        aria-invalid="true"
        className="border-destructive h-9 rounded-md border px-3 text-sm"
        defaultValue="invalid-email"
      />
      <Field.Error>Enter a valid email address.</Field.Error>
    </Field>
  ),
};

export const WithSingleError: Story = {
  render: () => (
    <Field data-invalid="true" className="max-w-md">
      <Field.Label htmlFor="single-error-input">Username</Field.Label>
      <input
        id="single-error-input"
        className="border-input h-9 rounded-md border px-3 text-sm"
        defaultValue="ab"
      />
      <Field.Error errors={[{ message: "Username must contain at least 3 characters." }]} />
    </Field>
  ),
};

export const WithMultipleErrors: Story = {
  render: () => (
    <Field data-invalid="true" className="max-w-md">
      <Field.Label htmlFor="multiple-errors-input">Password</Field.Label>
      <input
        id="multiple-errors-input"
        type="password"
        className="border-input h-9 rounded-md border px-3 text-sm"
        defaultValue="123"
      />
      <Field.Error
        errors={[
          { message: "Password must contain at least 8 characters." },
          { message: "Password must contain at least one uppercase letter." },
          { message: "Password must contain at least one special character." },
        ]}
      />
    </Field>
  ),
};

export const FieldSetExample: Story = {
  render: () => (
    <Field.Set className="max-w-md">
      <Field.Legend>Personal information</Field.Legend>

      <Field.Group>
        <Field>
          <Field.Label htmlFor="first-name">First name</Field.Label>
          <input
            id="first-name"
            className="border-input h-9 rounded-md border px-3 text-sm"
            placeholder="John"
          />
        </Field>

        <Field>
          <Field.Label htmlFor="last-name">Last name</Field.Label>
          <input
            id="last-name"
            className="border-input h-9 rounded-md border px-3 text-sm"
            placeholder="Doe"
          />
        </Field>
      </Field.Group>
    </Field.Set>
  ),
};

export const FieldGroupExample: Story = {
  render: () => (
    <Field.Group className="max-w-md">
      <Field>
        <Field.Label htmlFor="group-email">Email</Field.Label>
        <input
          id="group-email"
          className="border-input h-9 rounded-md border px-3 text-sm"
          placeholder="john@example.com"
        />
      </Field>

      <Field.Separator>Or continue with</Field.Separator>

      <Field>
        <Field.Label htmlFor="group-phone">Phone</Field.Label>
        <input
          id="group-phone"
          className="border-input h-9 rounded-md border px-3 text-sm"
          placeholder="+1 555 000 0000"
        />
      </Field>
    </Field.Group>
  ),
};

export const LegendVariants: Story = {
  render: () => (
    <div className="flex max-w-md flex-col gap-8">
      <Field.Set>
        <Field.Legend variant="legend">Legend variant</Field.Legend>
        <Field.Description>Default legend styling.</Field.Description>
      </Field.Set>

      <Field.Set>
        <Field.Legend variant="label">Label variant</Field.Legend>
        <Field.Description>Smaller legend styling.</Field.Description>
      </Field.Set>
    </div>
  ),
};
