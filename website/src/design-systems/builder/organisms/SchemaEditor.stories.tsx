import type { Meta, StoryObj } from "@storybook/react";
import { SchemaEditorModal } from "./SchemaEditor";
import type { OrbitalSchema } from "@almadar/core";

const meta: Meta<typeof SchemaEditorModal> = {
  title: "Builder/Organisms/SchemaEditor",
  component: SchemaEditorModal,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  args: {
    onClose: () => {},
    onSave: async () => {},
  },
};

export default meta;
type Story = StoryObj<typeof SchemaEditorModal>;

// =============================================================================
// Mock Data
// =============================================================================

const sampleSchema: OrbitalSchema = {
  name: "TaskManager",
  version: "1.0.0",
  orbitals: [
    {
      name: "Task Management",
      entity: {
        name: "Task",
        collection: "tasks",
        fields: [
          { name: "title", type: "string", required: true },
          { name: "status", type: "enum", values: ["pending", "active", "done"] },
          { name: "description", type: "string" },
        ],
      },
      traits: [
        {
          name: "TaskInteraction",
          category: "interaction",
          linkedEntity: "Task",
          stateMachine: {
            states: [
              { name: "Browsing", isInitial: true },
              { name: "Creating" },
            ],
            events: [
              { key: "INIT", name: "INIT" },
              { key: "CREATE", name: "CREATE" },
              { key: "SAVE", name: "SAVE" },
              { key: "CANCEL", name: "CANCEL" },
            ],
            transitions: [
              {
                from: "Browsing",
                to: "Browsing",
                event: "INIT",
                effects: [
                  ["render-ui", "main", { type: "page-header", title: "Tasks", actions: [{ label: "New Task", event: "CREATE", variant: "primary" }] }],
                  ["render-ui", "main", { type: "entity-table", entity: "Task", columns: ["title", "status"] }],
                ],
              },
              { from: "Browsing", to: "Creating", event: "CREATE", effects: [] },
              { from: "Creating", to: "Browsing", event: "SAVE", effects: [] },
              { from: "Creating", to: "Browsing", event: "CANCEL", effects: [] },
            ],
          },
        },
      ],
      pages: [
        { name: "TasksPage", path: "/tasks", traits: [{ ref: "TaskInteraction" }] },
      ],
    },
  ],
} as unknown as OrbitalSchema;

// =============================================================================
// Stories
// =============================================================================

/** Default open editor with a sample schema */
export const Default: Story = {
  args: {
    isOpen: true,
    schema: sampleSchema,
    appId: "app-task-manager-001",
  },
};

/** Editor in closed state (nothing visible) */
export const Closed: Story = {
  args: {
    isOpen: false,
    schema: sampleSchema,
    appId: "app-task-manager-001",
  },
};

/** Editor with a null schema (empty content) */
export const NullSchema: Story = {
  args: {
    isOpen: true,
    schema: null,
    appId: "app-empty-001",
  },
};
