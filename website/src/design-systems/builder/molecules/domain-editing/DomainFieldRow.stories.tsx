import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { DomainFieldRow } from "./DomainFieldRow";

const meta: Meta<typeof DomainFieldRow> = {
  title: "Builder/Molecules/DomainEditing/DomainFieldRow",
  component: DomainFieldRow,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DomainFieldRow>;

export const Default: Story = {
  args: {
    name: "title",
    fieldType: "text",
    onEdit: fn(),
    onDelete: fn(),
  },
};

export const WithConstraints: Story = {
  args: {
    name: "email",
    fieldType: "text",
    constraints: [
      { type: "required" },
      { type: "unique" },
    ],
    onEdit: fn(),
    onDelete: fn(),
  },
};

export const EnumField: Story = {
  args: {
    name: "status",
    fieldType: "enum",
    enumValues: ["active", "pending", "done"],
    onEdit: fn(),
    onDelete: fn(),
  },
};

export const WithError: Story = {
  args: {
    name: "amount",
    fieldType: "number",
    error: "Field name conflicts with a reserved keyword",
    onEdit: fn(),
    onDelete: fn(),
  },
};

export const Draggable: Story = {
  args: {
    name: "description",
    fieldType: "text",
    draggable: true,
    constraints: [{ type: "required" }],
    onEdit: fn(),
    onDelete: fn(),
  },
};

export const ReadOnly: Story = {
  args: {
    name: "created_at",
    fieldType: "timestamp",
    constraints: [{ type: "auto" }],
    editable: false,
  },
};
