import type { Meta, StoryObj } from "@storybook/react";
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
    onEdit: () => {},
    onDelete: () => {},
    onTargetClick: () => {},
  },
};

export const HasMany: Story = {
  args: {
    relationshipType: "has_many",
    targetEntity: "Order",
    onEdit: () => {},
    onDelete: () => {},
    onTargetClick: () => {},
  },
};

export const HasOne: Story = {
  args: {
    relationshipType: "has_one",
    targetEntity: "Profile",
    onEdit: () => {},
    onDelete: () => {},
    onTargetClick: () => {},
  },
};

export const WithAlias: Story = {
  args: {
    relationshipType: "belongs_to",
    targetEntity: "User",
    alias: "Assignee",
    onEdit: () => {},
    onDelete: () => {},
    onTargetClick: () => {},
  },
};

export const WithSource: Story = {
  args: {
    relationshipType: "has_many",
    targetEntity: "LineItem",
    sourceEntity: "Task",
    onEdit: () => {},
    onDelete: () => {},
    onTargetClick: () => {},
  },
};

export const ReadOnly: Story = {
  args: {
    relationshipType: "belongs_to",
    targetEntity: "Organization",
    editable: false,
    onTargetClick: () => {},
  },
};
