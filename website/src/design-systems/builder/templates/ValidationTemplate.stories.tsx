import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { ValidationTemplate } from "./ValidationTemplate";
import type { ValidationEntity } from "./ValidationTemplate";

const meta: Meta<typeof ValidationTemplate> = {
  title: "Builder/Templates/ValidationTemplate",
  component: ValidationTemplate,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ValidationTemplate>;

const baseEntity: ValidationEntity = {
  appName: "TaskManager",
  appId: "app_123",
  stage: "complete",
  isValidating: false,
  isFixing: false,
  progressMessage: null,
  errors: [],
  warnings: [],
  isValid: true,
  validationError: null,
  agentStatus: "idle",
  activities: [],
  todos: [],
  schemaDiffs: [],
  agentError: null,
  isLoading: false,
  loadError: null,
};

const MockSidebar = () => (
  <div
    style={{
      width: 240,
      height: "100%",
      background: "var(--color-card)",
      borderRight: "1px solid var(--color-border)",
      padding: 16,
    }}
  >
    <p style={{ fontSize: 14, color: "var(--color-muted-foreground)" }}>
      App Sidebar
    </p>
  </div>
);

export const Default: Story = {
  args: {
    entity: baseEntity,
    sidebarSlot: <MockSidebar />,
  },
};

export const WithErrors: Story = {
  args: {
    entity: {
      ...baseEntity,
      isValid: false,
      errors: [
        {
          code: "UNREACHABLE_STATE",
          message: "State 'Deleting' has no incoming transitions",
          severity: "error",
          path: ["orbitals", "0", "traits", "0", "stateMachine", "states", "4"],
          suggestion: "Add a transition leading to this state or remove it",
        },
        {
          code: "MISSING_EMIT",
          message: "Event 'TASK_CREATED' is emitted but not declared in emits array",
          severity: "error",
          path: ["orbitals", "0", "traits", "0", "emits"],
        },
      ],
      warnings: [
        {
          code: "UNUSED_FIELD",
          message: "Field 'priority' is defined but never referenced in any render-ui effect",
          severity: "warning",
          path: ["orbitals", "0", "entity", "fields", "2"],
        },
      ],
    },
    sidebarSlot: <MockSidebar />,
  },
};

export const Loading: Story = {
  args: {
    entity: {
      ...baseEntity,
      isLoading: true,
    },
  },
};

export const Validating: Story = {
  args: {
    entity: {
      ...baseEntity,
      stage: "validating",
      isValidating: true,
      progressMessage: "Checking state machine transitions...",
    },
    sidebarSlot: <MockSidebar />,
  },
};
