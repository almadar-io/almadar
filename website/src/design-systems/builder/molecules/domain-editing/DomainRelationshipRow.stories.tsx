import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { DomainRelationshipRow } from "./DomainRelationshipRow";

const meta: Meta<typeof DomainRelationshipRow> = {
  title: "Builder/Molecules/DomainEditing/DomainRelationshipRow",
  component: DomainRelationshipRow,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DomainRelationshipRow>;

export const Default: Story = {
  args: {
    relationshipType: "belongs_to",
    targetEntity: "User",
    onEdit: fn(),
    onDelete: fn(),
    onTargetClick: fn(),
  },
};

export const HasMany: Story = {
  args: {
    relationshipType: "has_many",
    targetEntity: "Order",
    onEdit: fn(),
    onDelete: fn(),
    onTargetClick: fn(),
  },
};

export const HasOne: Story = {
  args: {
    relationshipType: "has_one",
    targetEntity: "Profile",
    onEdit: fn(),
    onDelete: fn(),
    onTargetClick: fn(),
  },
};

export const WithAlias: Story = {
  args: {
    relationshipType: "belongs_to",
    targetEntity: "User",
    alias: "Assignee",
    onEdit: fn(),
    onDelete: fn(),
    onTargetClick: fn(),
  },
};

export const WithSource: Story = {
  args: {
    relationshipType: "has_many",
    targetEntity: "LineItem",
    sourceEntity: "Task",
    onEdit: fn(),
    onDelete: fn(),
    onTargetClick: fn(),
  },
};

export const ReadOnly: Story = {
  args: {
    relationshipType: "belongs_to",
    targetEntity: "Organization",
    editable: false,
    onTargetClick: fn(),
  },
};
