import type { Meta, StoryObj } from "@storybook/react";
import { TodoItem, type Todo } from "./TodoItem";

const meta: Meta<typeof TodoItem> = {
  title: "Builder/Molecules/TodoItem",
  component: TodoItem,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TodoItem>;

export const Pending: Story = {
  args: {
    todo: {
      id: "1",
      task: "Create Task entity schema",
      status: "pending",
    },
  },
};

export const InProgress: Story = {
  args: {
    todo: {
      id: "2",
      task: "Implement CRUD operations",
      status: "in_progress",
    },
  },
};

export const Completed: Story = {
  args: {
    todo: {
      id: "3",
      task: "Add validation rules",
      status: "completed",
    },
  },
};

export const WithLatestActivity: Story = {
  args: {
    todo: {
      id: "4",
      task: "Update schema version",
      status: "in_progress",
      latestActivity: {
        type: "thinking",
        content: "Analyzing the current schema structure...",
        timestamp: Date.now(),
      },
    },
  },
};

export const WithToolCallActivity: Story = {
  args: {
    todo: {
      id: "5",
      task: "Read configuration file",
      status: "in_progress",
      latestActivity: {
        type: "tool_call",
        content: "Reading file...",
        timestamp: Date.now(),
        tool: "read_file",
      },
    },
  },
};

export const WithCodeChangeActivity: Story = {
  args: {
    todo: {
      id: "6",
      task: "Update schema name",
      status: "in_progress",
      latestActivity: {
        type: "code_change",
        content: "Updated name field",
        timestamp: Date.now(),
        filePath: "schema.orb",
        diff: `--- a/schema.orb
+++ b/schema.orb
@@ -1,3 +1,3 @@
 {
-  "name": "OldName",
+  "name": "NewName",
   "version": "1.0.0"
 }`,
      },
    },
  },
};

export const WithActivityHistory: Story = {
  args: {
    todo: {
      id: "7",
      task: "Complete schema migration",
      status: "in_progress",
      latestActivity: {
        type: "tool_result",
        content: "File written successfully",
        timestamp: Date.now(),
        success: true,
      },
      activityHistory: [
        {
          type: "thinking",
          content: "Planning the migration...",
          timestamp: Date.now() - 60000,
        },
        {
          type: "tool_call",
          content: "Reading source file",
          timestamp: Date.now() - 30000,
          tool: "read_file",
        },
        {
          type: "tool_result",
          content: "File written successfully",
          timestamp: Date.now(),
          success: true,
        },
      ],
    },
  },
};

export const TodoListExample: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        maxWidth: "500px",
      }}
    >
      <TodoItem
        todo={{
          id: "1",
          task: "Create Task entity",
          status: "completed",
        }}
      />
      <TodoItem
        todo={{
          id: "2",
          task: "Add TaskManagement trait",
          status: "completed",
        }}
      />
      <TodoItem
        todo={{
          id: "3",
          task: "Implement state machine",
          status: "in_progress",
          latestActivity: {
            type: "thinking",
            content: "Designing state transitions...",
            timestamp: Date.now(),
          },
        }}
      />
      <TodoItem
        todo={{
          id: "4",
          task: "Add render-ui effects",
          status: "pending",
        }}
      />
      <TodoItem
        todo={{
          id: "5",
          task: "Validate schema",
          status: "pending",
        }}
      />
    </div>
  ),
};

export const LongTask: Story = {
  args: {
    todo: {
      id: "8",
      task: "Implement comprehensive error handling with retry logic and user-friendly error messages for all API endpoints",
      status: "in_progress",
    },
  },
};

export const NotAutoExpanded: Story = {
  args: {
    todo: {
      id: "9",
      task: "Background task with activity",
      status: "in_progress",
      latestActivity: {
        type: "thinking",
        content: "Processing...",
        timestamp: Date.now(),
      },
    },
    autoExpand: false,
  },
};
