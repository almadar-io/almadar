import type { Meta, StoryObj } from "@storybook/react";
import { AgentChatPanel } from "./AgentChatPanel";
import type { ActivityItem } from "./AgentActivityFeed";
import type { Todo } from "../../molecules/agent";
import type { SchemaDiff } from "./SchemaDiffViewer";

const meta: Meta<typeof AgentChatPanel> = {
  title: "Builder/Organisms/AgentChatPanel",
  component: AgentChatPanel,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    status: {
      control: "select",
      options: ["idle", "running", "complete", "error", "interrupted"],
    },
    variant: {
      control: "select",
      options: ["panel", "full"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof AgentChatPanel>;

const mockActivities: ActivityItem[] = [
  {
    type: "message",
    role: "user",
    content: "Create a task management schema",
    timestamp: Date.now() - 300000,
  },
  {
    type: "message",
    role: "assistant",
    content:
      "I'll create a task management schema for you. Let me start by reading the existing files...",
    timestamp: Date.now() - 240000,
  },
  {
    type: "tool_call",
    tool: "read_file",
    args: { file_path: "/project/schema.orb" },
    timestamp: Date.now() - 240000,
  },
  {
    type: "tool_result",
    tool: "read_file",
    result:
      '{\n  "name": "MyProject",\n  "version": "1.0.0",\n  "orbitals": [\n    {\n      "name": "UserManagement",\n      "entity": {\n        "name": "User",\n        "fields": [\n          { "name": "email", "type": "string" },\n          { "name": "role", "type": "enum", "values": ["admin", "user"] }\n        ]\n      }\n    }\n  ]\n}',
    success: true,
    timestamp: Date.now() - 230000,
  },
  {
    type: "message",
    role: "assistant",
    content:
      "I've analyzed your current schema. Now I'll add the Task orbital...",
    timestamp: Date.now() - 180000,
  },
  {
    type: "tool_call",
    tool: "edit_file",
    args: {
      file_path: "/project/schema.orb",
      old_string: '"orbitals": [',
      new_string:
        '"orbitals": [\n    {\n      "name": "TaskManagement",\n      "entity": { "name": "Task" }\n    },',
    },
    timestamp: Date.now() - 120000,
  },
  {
    type: "tool_result",
    tool: "edit_file",
    result: "Edit applied successfully — 1 replacement made",
    success: true,
    timestamp: Date.now() - 110000,
  },
];

const mockTodos: Todo[] = [
  { id: "1", task: "Create Task entity", status: "completed" },
  { id: "2", task: "Add TaskManagement trait", status: "completed" },
  { id: "3", task: "Implement state machine", status: "in_progress" },
  { id: "4", task: "Add render-ui effects", status: "pending" },
];

const mockDiffs: SchemaDiff[] = [
  {
    id: "diff-1",
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
    timestamp: Date.now() - 60000,
    addedLines: 4,
    removedLines: 0,
  },
];

export const Idle: Story = {
  args: {
    status: "idle",
    activities: [],
    todos: [],
    showInput: true,
    placeholder: "Ask me to help with your orbital schema...",
    onSendMessage: (message) => console.log("Send:", message),
  },
};

export const Running: Story = {
  args: {
    status: "running",
    skill: "kflow-orbitals",
    activities: mockActivities,
    todos: mockTodos,
    showInput: true,
    showTodos: true,
    onSendMessage: (message) => console.log("Send:", message),
    onCancel: () => console.log("Cancel"),
  },
};

export const Complete: Story = {
  args: {
    status: "complete",
    skill: "kflow-orbitals",
    activities: mockActivities,
    todos: mockTodos.map((t) => ({ ...t, status: "completed" as const })),
    schemaDiffs: mockDiffs,
    showInput: true,
    showTodos: true,
    showDiffs: true,
    onSendMessage: (message) => console.log("Send:", message),
  },
};

export const WithError: Story = {
  args: {
    status: "error",
    skill: "kflow-orbitals",
    activities: [
      ...mockActivities,
      {
        type: "error" as const,
        message: "Failed to validate schema: Invalid trait reference",
        code: "VALIDATION_ERROR",
        timestamp: Date.now(),
      },
    ],
    showInput: true,
    onSendMessage: (message) => console.log("Send:", message),
    onRetryError: () => console.log("Retry"),
  },
};

export const Interrupted: Story = {
  args: {
    status: "interrupted",
    skill: "kflow-orbitals",
    activities: mockActivities.slice(0, 4),
    todos: mockTodos.slice(0, 2),
    showInput: true,
    showTodos: true,
    onSendMessage: (message) => console.log("Send:", message),
  },
};

export const PanelVariant: Story = {
  args: {
    status: "running",
    variant: "panel",
    activities: mockActivities.slice(0, 3),
    showInput: true,
    onSendMessage: (message) => console.log("Send:", message),
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px", height: "600px" }}>
        <Story />
      </div>
    ),
  ],
};

export const FullVariant: Story = {
  args: {
    status: "complete",
    variant: "full",
    skill: "kflow-orbitals",
    activities: mockActivities,
    todos: mockTodos,
    schemaDiffs: mockDiffs,
    showInput: true,
    showTodos: true,
    showDiffs: true,
    onSendMessage: (message) => console.log("Send:", message),
  },
  decorators: [
    (Story) => (
      <div style={{ height: "100vh" }}>
        <Story />
      </div>
    ),
  ],
};

export const WithoutInput: Story = {
  args: {
    status: "complete",
    activities: mockActivities,
    showInput: false,
    onSendMessage: (message) => console.log("Send:", message),
  },
};

export const TodosOnly: Story = {
  args: {
    status: "running",
    activities: [],
    todos: mockTodos,
    showTodos: true,
    showDiffs: false,
    showInput: false,
    onSendMessage: (message) => console.log("Send:", message),
  },
};

export const WithThreadId: Story = {
  args: {
    status: "running",
    skill: "kflow-orbitals",
    threadId: "thread_abc123",
    activities: mockActivities.slice(0, 2),
    showInput: true,
    onSendMessage: (message) => console.log("Send:", message),
  },
};
