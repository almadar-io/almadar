import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { DomainSectionHeader } from "./DomainSectionHeader";

const meta: Meta<typeof DomainSectionHeader> = {
  title: "Builder/Molecules/DomainEditing/DomainSectionHeader",
  component: DomainSectionHeader,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DomainSectionHeader>;

export const Default: Story = {
  args: {
    title: "Patient",
    sectionType: "entity",
    count: 8,
    onEdit: () => {},
    onDelete: () => {},
    onAdd: () => {},
  },
};

export const BehaviorSection: Story = {
  args: {
    title: "TaskInteraction",
    sectionType: "behavior",
    count: 5,
    subtitle: "Manages CRUD operations for tasks",
    onEdit: () => {},
    onDelete: () => {},
    onAdd: () => {},
  },
};

export const PageSection: Story = {
  args: {
    title: "DashboardPage",
    sectionType: "page",
    subtitle: "Main dashboard view at /dashboard",
    onEdit: () => {},
    onDelete: () => {},
  },
};

export const TickSection: Story = {
  args: {
    title: "AutoArchive",
    sectionType: "tick",
    subtitle: "Archives completed tasks after 30 days",
    onEdit: () => {},
    onDelete: () => {},
  },
};

export const WithChildren: Story = {
  args: {
    title: "Order",
    sectionType: "entity",
    count: 3,
    expanded: true,
    onEdit: () => {},
    onDelete: () => {},
    onAdd: () => {},
    children: React.createElement(
      "div",
      { style: { display: "flex", flexDirection: "column", gap: "4px" } },
      React.createElement(
        "div",
        {
          style: {
            padding: "8px 12px",
            borderRadius: "6px",
            backgroundColor: "var(--color-secondary)",
            fontSize: "14px",
          },
        },
        "- order_number : text (required, unique)"
      ),
      React.createElement(
        "div",
        {
          style: {
            padding: "8px 12px",
            borderRadius: "6px",
            backgroundColor: "var(--color-secondary)",
            fontSize: "14px",
          },
        },
        "- total : number (required)"
      ),
      React.createElement(
        "div",
        {
          style: {
            padding: "8px 12px",
            borderRadius: "6px",
            backgroundColor: "var(--color-secondary)",
            fontSize: "14px",
          },
        },
        "- status : active | pending | done"
      )
    ),
  },
};

export const WithError: Story = {
  args: {
    title: "BrokenEntity",
    sectionType: "entity",
    count: 2,
    hasError: true,
    onEdit: () => {},
    onDelete: () => {},
  },
};

export const Collapsed: Story = {
  args: {
    title: "ArchivedBehavior",
    sectionType: "behavior",
    expanded: false,
    count: 12,
    subtitle: "This section is collapsed",
    onEdit: () => {},
    onDelete: () => {},
    children: React.createElement("div", null, "This content is hidden when collapsed"),
  },
};
