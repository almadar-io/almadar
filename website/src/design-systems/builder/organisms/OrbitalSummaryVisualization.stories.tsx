import type { Meta, StoryObj } from "@storybook/react";
import {
  OrbitalSummaryVisualization,
} from "./OrbitalSummaryVisualization";
import type { OrbitalSchema } from "@almadar/core";

const meta: Meta<typeof OrbitalSummaryVisualization> = {
  title: "Builder/Organisms/OrbitalSummaryVisualization",
  component: OrbitalSummaryVisualization,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        style={{
          padding: "2rem",
          backgroundColor: "var(--color-background)",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ maxWidth: 700, width: "100%" }}>
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof OrbitalSummaryVisualization>;

// ============================================================================
// Mock Schemas
// ============================================================================

const taskManagerSchema: OrbitalSchema = {
  name: "Task Manager",
  description: "Simple task management app",
  version: "1.0.0",
  orbitals: [
    {
      name: "Task Management",
      entity: {
        name: "Task",
        collection: "tasks",
        fields: [
          { name: "title", type: "string", required: true },
          {
            name: "status",
            type: "enum",
            values: ["pending", "active", "done"],
            required: true,
          },
          { name: "assignee", type: "string" },
        ],
      },
      traits: [
        {
          name: "TaskInteraction",
          category: "interaction" as const,
          linkedEntity: "Task",
          stateMachine: {
            states: [
              { name: "browsing", isInitial: true },
              { name: "creating" },
              { name: "editing" },
              { name: "viewing" },
            ],
            events: [
              { key: "INIT", name: "INIT" },
              { key: "CREATE", name: "CREATE" },
              { key: "EDIT", name: "EDIT" },
              { key: "VIEW", name: "VIEW" },
              { key: "SAVE", name: "SAVE" },
              { key: "CANCEL", name: "CANCEL" },
            ],
            transitions: [
              { from: "browsing", to: "browsing", event: "INIT" },
              { from: "browsing", to: "creating", event: "CREATE" },
              { from: "browsing", to: "editing", event: "EDIT" },
              { from: "browsing", to: "viewing", event: "VIEW" },
              { from: "creating", to: "browsing", event: "SAVE" },
              { from: "editing", to: "browsing", event: "SAVE" },
              { from: "creating", to: "browsing", event: "CANCEL" },
              { from: "editing", to: "browsing", event: "CANCEL" },
              { from: "viewing", to: "browsing", event: "CANCEL" },
            ],
          },
        },
      ],
      pages: [
        {
          name: "TasksPage",
          path: "/tasks",
          traits: [{ ref: "TaskInteraction" }],
        },
      ],
    },
  ],
};

const inspectionWizardSchema: OrbitalSchema = {
  name: "Inspection System",
  description: "Government inspection workflow",
  version: "2.0.0",
  orbitals: [
    {
      name: "Inspection Workflow",
      entity: {
        name: "Inspection",
        collection: "inspections",
        fields: [
          { name: "title", type: "string", required: true },
          {
            name: "phase",
            type: "enum",
            values: ["intro", "content", "record", "closing"],
            required: true,
          },
        ],
      },
      traits: [
        {
          name: "InspectionFlow",
          category: "interaction" as const,
          linkedEntity: "Inspection",
          stateMachine: {
            states: [
              { name: "introduction", isInitial: true },
              { name: "content" },
              { name: "record" },
              { name: "closing" },
              { name: "completed", isTerminal: true },
            ],
            events: [
              { key: "INIT", name: "INIT" },
              { key: "NEXT", name: "NEXT" },
              { key: "PREV", name: "PREV" },
              { key: "COMPLETE", name: "COMPLETE" },
            ],
            transitions: [
              { from: "introduction", to: "introduction", event: "INIT" },
              { from: "introduction", to: "content", event: "NEXT" },
              { from: "content", to: "introduction", event: "PREV" },
              { from: "content", to: "record", event: "NEXT" },
              { from: "record", to: "content", event: "PREV" },
              { from: "record", to: "closing", event: "NEXT" },
              { from: "closing", to: "completed", event: "COMPLETE" },
            ],
          },
        },
      ],
      pages: [
        {
          name: "InspectionPage",
          path: "/inspection/:id",
          traits: [{ ref: "InspectionFlow" }],
        },
      ],
    },
  ],
};

const battleSchema: OrbitalSchema = {
  name: "Trait Wars",
  description: "Tactical turn-based game",
  version: "1.0.0",
  orbitals: [
    {
      name: "Tactical Battle",
      entity: {
        name: "Battle",
        collection: "battles",
        fields: [
          { name: "mapId", type: "string", required: true },
          { name: "turnNumber", type: "number", required: true },
          {
            name: "phase",
            type: "enum",
            values: ["deployment", "combat", "resolution"],
            required: true,
          },
        ],
      },
      traits: [
        {
          name: "BattleInteraction",
          category: "interaction" as const,
          linkedEntity: "Battle",
          stateMachine: {
            states: [
              { name: "lobby", isInitial: true },
              { name: "deployment" },
              { name: "playerTurn" },
              { name: "enemyTurn" },
              { name: "resolution", isTerminal: true },
            ],
            events: [
              { key: "INIT", name: "INIT" },
              { key: "START", name: "START" },
              { key: "DEPLOY", name: "DEPLOY" },
              { key: "ATTACK", name: "ATTACK" },
              { key: "END_TURN", name: "END_TURN" },
              { key: "RESOLVE", name: "RESOLVE" },
            ],
            transitions: [
              { from: "lobby", to: "lobby", event: "INIT" },
              { from: "lobby", to: "deployment", event: "START" },
              { from: "deployment", to: "playerTurn", event: "DEPLOY" },
              { from: "playerTurn", to: "enemyTurn", event: "END_TURN" },
              { from: "enemyTurn", to: "playerTurn", event: "END_TURN" },
              { from: "playerTurn", to: "resolution", event: "RESOLVE" },
            ],
          },
        },
      ],
      pages: [
        {
          name: "BattlePage",
          path: "/battle/:id",
          traits: [{ ref: "BattleInteraction" }],
        },
      ],
    },
  ],
};

const multiOrbitalSchema: OrbitalSchema = {
  name: "Full App",
  version: "1.0.0",
  orbitals: [
    taskManagerSchema.orbitals[0],
    inspectionWizardSchema.orbitals[0],
    battleSchema.orbitals[0],
  ],
};

// ============================================================================
// Stories
// ============================================================================

export const Default: Story = {
  args: {
    entity: { schema: taskManagerSchema },
  },
};

export const WizardWorkflow: Story = {
  args: {
    entity: { schema: inspectionWizardSchema },
  },
};

export const GameBattle: Story = {
  args: {
    entity: { schema: battleSchema },
  },
};

export const SecondOrbital: Story = {
  args: {
    entity: { schema: multiOrbitalSchema, orbitalIndex: 1 },
  },
};

export const ThirdOrbital: Story = {
  args: {
    entity: { schema: multiOrbitalSchema, orbitalIndex: 2 },
  },
};

export const EmptySchema: Story = {
  args: {
    entity: { schema: { name: "Empty", orbitals: [] } },
  },
};

export const Loading: Story = {
  args: {
    entity: { schema: taskManagerSchema },
    isLoading: true,
  },
};

export const WithError: Story = {
  args: {
    entity: { schema: taskManagerSchema },
    error: new Error("Failed to load schema"),
  },
};
