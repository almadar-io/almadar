import type { Meta, StoryObj } from "@storybook/react";
import { AgentActivityFeed, type ActivityItem } from "./AgentActivityFeed";

const meta: Meta<typeof AgentActivityFeed> = {
  title: "Builder/Organisms/Agent/AgentActivityFeed",
  component: AgentActivityFeed,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AgentActivityFeed>;

const now = Date.now();

const mockActivities: ActivityItem[] = [
  {
    type: "message",
    role: "user",
    content: "Create a task management schema with CRUD operations",
    timestamp: now - 300000,
  },
  {
    type: "message",
    role: "assistant",
    content:
      "I'll create a task management schema for you. Let me start by reading the existing project files...",
    timestamp: now - 280000,
  },
  {
    type: "tool_call",
    tool: "read_file",
    args: { file_path: "/project/schema.orb" },
    timestamp: now - 260000,
  },
  {
    type: "tool_result",
    tool: "read_file",
    result: '{ "name": "MyProject", "version": "1.0.0", "orbitals": [] }',
    success: true,
    timestamp: now - 250000,
  },
  {
    type: "file_operation",
    operation: "write",
    path: "/project/schema.orb",
    success: true,
    timestamp: now - 200000,
  },
  {
    type: "schema_diff",
    filePath: "schema.orb",
    hunks: [
      {
        oldStart: 1,
        oldLines: 2,
        newStart: 1,
        newLines: 6,
        lines: [
          { type: "context", content: '  "orbitals": [' },
          { type: "add", content: "    {" },
          { type: "add", content: '      "name": "TaskManagement",' },
          { type: "add", content: '      "entity": { "name": "Task" }' },
          { type: "add", content: "    }" },
          { type: "context", content: "  ]" },
        ],
      },
    ],
    timestamp: now - 180000,
  },
];

const errorActivity: ActivityItem = {
  type: "error",
  message: "Failed to validate schema: Invalid trait reference 'TaskInteraction'",
  code: "VALIDATION_ERROR",
  timestamp: now - 10000,
};

export const Default: Story = {
  args: {
    activities: mockActivities,
    autoScroll: true,
    onRetryError: () => {},
    onDismissError: () => {},
  },
};

export const Empty: Story = {
  args: {
    activities: [],
  },
};

export const SingleMessage: Story = {
  args: {
    activities: [
      {
        type: "message",
        role: "user",
        content: "What patterns are available for entity tables?",
        timestamp: now - 5000,
      },
    ],
  },
};

export const WithErrors: Story = {
  args: {
    activities: [
      ...mockActivities,
      errorActivity,
      {
        type: "error",
        message: "Network timeout: could not reach compilation server",
        code: "NETWORK_ERROR",
        timestamp: now - 5000,
      },
    ],
    onRetryError: () => {},
    onDismissError: () => {},
  },
};

export const LongFeed: Story = {
  args: {
    activities: [
      ...mockActivities,
      {
        type: "message",
        role: "assistant",
        content: "Now I'll add the state machine transitions for the CRUD behavior...",
        timestamp: now - 170000,
      },
      {
        type: "tool_call",
        tool: "edit_file",
        args: {
          file_path: "/project/schema.orb",
          old_string: '"entity": { "name": "Task" }',
          new_string: '"entity": { "name": "Task", "fields": [...] }',
        },
        timestamp: now - 160000,
      },
      {
        type: "tool_result",
        tool: "edit_file",
        result: "Edit applied successfully -- 1 replacement made",
        success: true,
        timestamp: now - 155000,
      },
      {
        type: "message",
        role: "assistant",
        content: "I've added the entity fields. Now let me add the trait with render-ui effects...",
        timestamp: now - 150000,
      },
      {
        type: "file_operation",
        operation: "write",
        path: "/project/design-system/organisms/TaskTable.tsx",
        success: true,
        timestamp: now - 140000,
      },
      {
        type: "message",
        role: "user",
        content: "Can you also add a priority field?",
        timestamp: now - 130000,
      },
      {
        type: "message",
        role: "assistant",
        content: "Of course! I'll add an enum priority field with values: low, medium, high, urgent.",
        timestamp: now - 120000,
      },
      {
        type: "tool_call",
        tool: "edit_file",
        args: { file_path: "/project/schema.orb", old_string: "fields: [", new_string: "fields: [priority, " },
        isExecuting: true,
        timestamp: now - 110000,
      },
    ],
    autoScroll: true,
    onRetryError: () => {},
    onDismissError: () => {},
  },
};
