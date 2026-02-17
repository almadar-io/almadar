import type { Meta, StoryObj } from "@storybook/react";
import { ToolBadge } from "./ToolBadge";

const meta: Meta<typeof ToolBadge> = {
  title: "Builder/Atoms/ToolBadge",
  component: ToolBadge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "file", "shell", "schema"],
    },
    size: {
      control: "select",
      options: ["sm", "md"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToolBadge>;

export const ReadFile: Story = {
  args: {
    tool: "read_file",
  },
};

export const WriteFile: Story = {
  args: {
    tool: "write_file",
  },
};

export const EditFile: Story = {
  args: {
    tool: "edit_file",
  },
};

export const Bash: Story = {
  args: {
    tool: "bash",
  },
};

export const Execute: Story = {
  args: {
    tool: "execute",
  },
};

export const Validate: Story = {
  args: {
    tool: "validate",
  },
};

export const GenerateSchema: Story = {
  args: {
    tool: "generate_schema",
  },
};

export const ListDirectory: Story = {
  args: {
    tool: "ls",
  },
};

export const FileVariant: Story = {
  args: {
    tool: "read_file",
    variant: "file",
  },
};

export const ShellVariant: Story = {
  args: {
    tool: "bash",
    variant: "shell",
  },
};

export const SchemaVariant: Story = {
  args: {
    tool: "validate",
    variant: "schema",
  },
};

export const AllTools: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <ToolBadge tool="read_file" />
      <ToolBadge tool="write_file" />
      <ToolBadge tool="edit_file" />
      <ToolBadge tool="bash" />
      <ToolBadge tool="execute" />
      <ToolBadge tool="validate" />
      <ToolBadge tool="generate_schema" />
      <ToolBadge tool="ls" />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px" }}>
      <ToolBadge tool="custom" variant="default" />
      <ToolBadge tool="read_file" variant="file" />
      <ToolBadge tool="bash" variant="shell" />
      <ToolBadge tool="validate" variant="schema" />
    </div>
  ),
};

export const Small: Story = {
  args: {
    tool: "read_file",
    size: "sm",
  },
};

export const Medium: Story = {
  args: {
    tool: "write_file",
    size: "md",
  },
};
