import type { Meta, StoryObj } from "@storybook/react";
import { OrbitalViewer } from "./OrbitalViewerBoard";
import type { OrbitalSchema } from "@almadar/core";

const meta: Meta<typeof OrbitalViewer> = {
  title: "Builder/Organisms/OrbitalViewerBoard",
  component: OrbitalViewer,
  tags: ["autodocs"],
  args: {
    onSchemaChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof OrbitalViewer>;

// =============================================================================
// Mock Data
// =============================================================================

const twoOrbitalSchema: OrbitalSchema = {
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
          { name: "assignee", type: "string" },
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
              { name: "Viewing" },
            ],
            events: [
              { key: "INIT", name: "INIT" },
              { key: "CREATE", name: "CREATE" },
              { key: "VIEW", name: "VIEW" },
              { key: "CANCEL", name: "CANCEL" },
            ],
            transitions: [
              { from: "Browsing", to: "Browsing", event: "INIT", effects: [] },
              { from: "Browsing", to: "Creating", event: "CREATE", effects: [] },
              { from: "Creating", to: "Browsing", event: "CANCEL", effects: [] },
              { from: "Browsing", to: "Viewing", event: "VIEW", effects: [] },
            ],
          },
        },
      ],
      pages: [
        { name: "TasksPage", path: "/tasks", traits: [{ ref: "TaskInteraction" }] },
      ],
    },
    {
      name: "User Management",
      entity: {
        name: "User",
        collection: "users",
        fields: [
          { name: "email", type: "string", required: true },
          { name: "role", type: "enum", values: ["admin", "member", "guest"] },
        ],
      },
      traits: [
        {
          name: "UserInteraction",
          category: "interaction",
          linkedEntity: "User",
          stateMachine: {
            states: [
              { name: "Browsing", isInitial: true },
              { name: "Editing" },
            ],
            events: [
              { key: "INIT", name: "INIT" },
              { key: "EDIT", name: "EDIT" },
            ],
            transitions: [
              { from: "Browsing", to: "Browsing", event: "INIT", effects: [] },
              { from: "Browsing", to: "Editing", event: "EDIT", effects: [] },
            ],
          },
        },
      ],
      pages: [
        { name: "UsersPage", path: "/users", traits: [{ ref: "UserInteraction" }] },
      ],
    },
  ],
} as unknown as OrbitalSchema;

const withValidationErrors = [
  { code: "MISSING_INITIAL", message: "No initial state defined", path: "orbitals[0].traits[0].stateMachine" },
  { code: "ORPHAN_TRANSITION", message: "Transition references non-existent state 'Archived'", path: "orbitals[0].traits[0].stateMachine.transitions[3]" },
];

// =============================================================================
// Stories
// =============================================================================

/** Default view with two orbitals in JSON mode */
export const Default: Story = {
  args: {
    schema: twoOrbitalSchema,
  },
};

/** Viewer showing validation errors in orbital view */
export const WithValidationErrors: Story = {
  args: {
    schema: twoOrbitalSchema,
    validationErrors: withValidationErrors,
  },
};

/** Read-only viewer */
export const ReadOnly: Story = {
  args: {
    schema: twoOrbitalSchema,
    readOnly: true,
  },
};

/** Viewer with custom domain text provided externally */
export const WithDomainText: Story = {
  args: {
    schema: twoOrbitalSchema,
    domainText: `# TaskManager\n\nA task management application.\n\n---\n\n# Entity: Task\n\nA Task is a unit of work.\nIt has title (required): string\nIt has status: enum\nIt has assignee: string\n\n---\n\n# Entity: User\n\nA User is a person in the system.\nIt has email (required): string\nIt has role: enum`,
  },
};

/** Empty schema with no orbitals */
export const EmptySchema: Story = {
  args: {
    schema: {
      name: "Empty App",
      version: "0.1.0",
      orbitals: [],
    } as unknown as OrbitalSchema,
  },
};
