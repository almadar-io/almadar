import type { Meta, StoryObj } from "@storybook/react";
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
    onEdit: () => {},
    onDelete: () => {},
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
    onEdit: () => {},
    onDelete: () => {},
  },
};

export const EnumField: Story = {
  args: {
    name: "status",
    fieldType: "enum",
    enumValues: ["active", "pending", "done"],
    onEdit: () => {},
    onDelete: () => {},
  },
};

export const WithError: Story = {
  args: {
    name: "amount",
    fieldType: "number",
    error: "Field name conflicts with a reserved keyword",
    onEdit: () => {},
    onDelete: () => {},
  },
};

export const Draggable: Story = {
  args: {
    name: "description",
    fieldType: "text",
    draggable: true,
    constraints: [{ type: "required" }],
    onEdit: () => {},
    onDelete: () => {},
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
