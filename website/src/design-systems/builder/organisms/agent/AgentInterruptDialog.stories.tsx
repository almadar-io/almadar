import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import {
  AgentInterruptDialog,
  type DeepAgentInterrupt,
} from "./AgentInterruptDialog";

const meta: Meta<typeof AgentInterruptDialog> = {
  title: "Builder/Organisms/Agent/AgentInterruptDialog",
  component: AgentInterruptDialog,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AgentInterruptDialog>;

const now = Date.now();

const twoActionInterrupt: DeepAgentInterrupt = {
  id: "interrupt-1",
  type: "tool_approval",
  timestamp: now,
  threadId: "thread-abc-123",
  actionRequests: [
    {
      id: "action-1",
      type: "tool_call",
      tool: "edit_file",
      args: {
        file_path: "/project/schema.orb",
        old_string: '"orbitals": []',
        new_string: '"orbitals": [{ "name": "TaskManagement" }]',
      },
      description: "Add TaskManagement orbital to the project schema",
      allowedDecisions: ["approve", "edit", "reject"],
      status: "pending",
    },
    {
      id: "action-2",
      type: "tool_call",
      tool: "write_file",
      args: {
        file_path: "/project/design-system/organisms/TaskTable.tsx",
        content: "export function TaskTable() { return <div>Tasks</div>; }",
      },
      description: "Create TaskTable component in the design system",
      allowedDecisions: ["approve", "edit", "reject"],
      status: "pending",
    },
  ],
};

export const Default: Story = {
  args: {
    interrupt: twoActionInterrupt,
    onSubmit: fn(),
    onCancel: fn(),
  },
};

export const SingleCall: Story = {
  args: {
    interrupt: {
      id: "interrupt-2",
      type: "tool_approval",
      timestamp: now,
      actionRequests: [
        {
          id: "action-1",
          type: "tool_call",
          tool: "bash",
          args: {
            command: "orbital validate projects/builder/builder.orb",
          },
          description: "Run schema validation on the builder project",
          allowedDecisions: ["approve", "reject"],
          status: "pending",
        },
      ],
    },
    onSubmit: fn(),
    onCancel: fn(),
  },
};

export const MixedStatus: Story = {
  args: {
    interrupt: {
      id: "interrupt-3",
      type: "tool_approval",
      timestamp: now,
      threadId: "thread-def-456",
      actionRequests: [
        {
          id: "action-1",
          type: "tool_call",
          tool: "read_file",
          args: { file_path: "/project/schema.orb" },
          description: "Read current schema file",
          allowedDecisions: ["approve", "edit", "reject"],
          status: "approved",
        },
        {
          id: "action-2",
          type: "tool_call",
          tool: "edit_file",
          args: {
            file_path: "/project/schema.orb",
            old_string: '"version": "1.0.0"',
            new_string: '"version": "2.0.0"',
          },
          description: "Bump schema version to 2.0.0",
          allowedDecisions: ["approve", "edit", "reject"],
          status: "pending",
        },
        {
          id: "action-3",
          type: "tool_call",
          tool: "bash",
          args: { command: "rm -rf /project/generated/" },
          description: "Clean generated output directory",
          allowedDecisions: ["approve", "reject"],
          status: "rejected",
        },
      ],
    },
    onSubmit: fn(),
    onCancel: fn(),
  },
};

export const ManyActions: Story = {
  args: {
    interrupt: {
      id: "interrupt-4",
      type: "tool_approval",
      timestamp: now,
      actionRequests: [
        {
          id: "action-1",
          type: "tool_call",
          tool: "read_file",
          args: { file_path: "/project/schema.orb" },
          allowedDecisions: ["approve", "reject"],
          status: "pending",
        },
        {
          id: "action-2",
          type: "tool_call",
          tool: "read_file",
          args: { file_path: "/project/design-system/index.ts" },
          allowedDecisions: ["approve", "reject"],
          status: "pending",
        },
        {
          id: "action-3",
          type: "tool_call",
          tool: "edit_file",
          args: {
            file_path: "/project/schema.orb",
            old_string: "placeholder",
            new_string: "updated",
          },
          description: "Apply schema update",
          allowedDecisions: ["approve", "edit", "reject"],
          status: "pending",
        },
        {
          id: "action-4",
          type: "tool_call",
          tool: "write_file",
          args: {
            file_path: "/project/design-system/organisms/NewComponent.tsx",
            content: "export function NewComponent() {}",
          },
          description: "Create new design system component",
          allowedDecisions: ["approve", "edit", "reject"],
          status: "pending",
        },
        {
          id: "action-5",
          type: "tool_call",
          tool: "bash",
          args: { command: "orbital compile projects/builder/builder.orb -o projects/builder/app/" },
          description: "Compile the updated schema",
          allowedDecisions: ["approve", "reject"],
          status: "pending",
        },
      ],
    },
    onSubmit: fn(),
    onCancel: fn(),
  },
};
