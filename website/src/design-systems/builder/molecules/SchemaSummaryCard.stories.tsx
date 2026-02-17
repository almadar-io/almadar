import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { SchemaSummaryCard } from "./SchemaSummaryCard";

const meta: Meta<typeof SchemaSummaryCard> = {
  title: "Builder/Molecules/SchemaSummaryCard",
  component: SchemaSummaryCard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SchemaSummaryCard>;

export const Default: Story = {
  args: {
    schema: {
      name: "TaskManager",
      description: "A task management application with kanban board and team collaboration features.",
      stateCount: 12,
      eventCount: 18,
      entityCount: 4,
      pageCount: 5,
    },
  },
};

export const Validated: Story = {
  args: {
    schema: {
      name: "HealthcarePortal",
      description: "Patient management system with appointment scheduling and medical records.",
      stateCount: 24,
      eventCount: 32,
      entityCount: 8,
      pageCount: 10,
    },
    validated: true,
  },
};

export const WithWarnings: Story = {
  args: {
    schema: {
      name: "ECommerceStore",
      description: "Online store with product catalog, cart, and checkout flow.",
      stateCount: 16,
      eventCount: 22,
      entityCount: 6,
      pageCount: 7,
    },
    validated: false,
  },
};

export const WithDomain: Story = {
  args: {
    schema: {
      name: "MedicalRecords",
      description: "Electronic health records management system.",
      stateCount: 30,
      eventCount: 45,
      entityCount: 12,
      pageCount: 15,
      domainContext: {
        category: "healthcare",
        subDomain: "electronic-health-records",
        confidence: 0.95,
      },
    },
    validated: true,
  },
};

export const WithActions: Story = {
  args: {
    schema: {
      name: "ProjectTracker",
      description: "Agile project management with sprints, stories, and burndown charts.",
      stateCount: 18,
      eventCount: 26,
      entityCount: 5,
      pageCount: 8,
    },
    appId: "app-project-tracker-001",
    validated: true,
    onPreview: fn(),
    onEdit: fn(),
  },
};

export const Minimal: Story = {
  args: {
    schema: {
      name: "SimpleApp",
      stateCount: 2,
      eventCount: 3,
      entityCount: 1,
      pageCount: 1,
    },
  },
};
