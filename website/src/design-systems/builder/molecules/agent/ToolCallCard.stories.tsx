import type { Meta, StoryObj } from "@storybook/react";
import { ToolCallCard } from "./ToolCallCard";

const meta: Meta<typeof ToolCallCard> = {
  title: "Builder/Molecules/ToolCallCard",
  component: ToolCallCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ToolCallCard>;

export const ReadTool: Story = {
  args: {
    tool: "read_file",
    args: { file_path: "/project/schema.orb" },
    result: "Read 125 lines",
    success: true,
  },
};

export const WriteTool: Story = {
  args: {
    tool: "write_file",
    args: {
      file_path: "/project/schema.orb",
      content: '{ "name": "MyProject" }',
    },
    result: "File written successfully",
    success: true,
  },
};

export const EditTool: Story = {
  args: {
    tool: "edit_file",
    args: {
      file_path: "/project/schema.orb",
      old_string: '"version": "1.0.0"',
      new_string: '"version": "1.1.0"',
    },
    result: "Edit applied successfully",
    success: true,
  },
};

export const BashTool: Story = {
  args: {
    tool: "bash",
    args: { command: "npm run build" },
    result: "Build completed in 3.2s",
    success: true,
  },
};

export const ErrorState: Story = {
  args: {
    tool: "bash",
    args: { command: "npm test" },
    error: "Error: 3 tests failed",
    success: false,
  },
};

export const ExecutingState: Story = {
  args: {
    tool: "execute",
    args: { prompt: "Search for authentication patterns" },
    isExecuting: true,
  },
};

export const JsonEditWithDiff: Story = {
  args: {
    tool: "edit_file",
    args: {
      file_path: "/project/config.json",
      old_string: '{\n  "name": "OldProject",\n  "version": "1.0.0"\n}',
      new_string: '{\n  "name": "NewProject",\n  "version": "2.0.0"\n}',
    },
    result: "Edit applied",
    success: true,
  },
};

export const WithComplexArgs: Story = {
  args: {
    tool: "validate",
    args: {
      schema_path: "/project/schema.orb",
      options: {
        strict: true,
        warnings: true,
        format: "json",
      },
    },
    result: { errors: 0, warnings: 2, valid: true },
    success: true,
  },
};

export const NoResult: Story = {
  args: {
    tool: "ls",
    args: { path: "/project" },
  },
};

export const MultipleToolCalls: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        maxWidth: "600px",
      }}
    >
      <ToolCallCard
        tool="read_file"
        args={{ file_path: "/project/schema.orb" }}
        result="Read 45 lines"
        success={true}
      />
      <ToolCallCard
        tool="edit_file"
        args={{
          file_path: "/project/schema.orb",
          old_string: "OldValue",
          new_string: "NewValue",
        }}
        result="1 replacement made"
        success={true}
      />
      <ToolCallCard
        tool="bash"
        args={{ command: "orbital validate schema.orb" }}
        result="Validation passed: 0 errors, 2 warnings"
        success={true}
      />
    </div>
  ),
};

export const ExecutionSequence: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        maxWidth: "600px",
      }}
    >
      <ToolCallCard
        tool="read_file"
        args={{ file_path: "/project/schema.orb" }}
        result="Read file content"
        success={true}
      />
      <ToolCallCard
        tool="edit_file"
        args={{
          file_path: "/project/schema.orb",
          old_string: "old",
          new_string: "new",
        }}
        isExecuting={true}
      />
      <ToolCallCard
        tool="bash"
        args={{ command: "orbital validate schema.orb" }}
      />
    </div>
  ),
};
