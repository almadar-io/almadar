import type { Meta, StoryObj } from "@storybook/react";
import { DiffLine } from "./DiffLine";

const meta: Meta<typeof DiffLine> = {
  title: "Builder/Atoms/DiffLine",
  component: DiffLine,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["add", "remove", "context"],
    },
    showLineNumber: {
      control: "boolean",
    },
  },
};

export default meta;
type Story = StoryObj<typeof DiffLine>;

export const Added: Story = {
  args: {
    type: "add",
    content: '  "name": "MyProject",',
    lineNumber: 2,
    showLineNumber: true,
  },
};

export const Removed: Story = {
  args: {
    type: "remove",
    content: '  "name": "OldProject",',
    lineNumber: 2,
    showLineNumber: true,
  },
};

export const Context: Story = {
  args: {
    type: "context",
    content: '  "version": "1.0.0",',
    lineNumber: 3,
    showLineNumber: true,
  },
};

export const WithoutLineNumber: Story = {
  args: {
    type: "add",
    content: '  "description": "A new description"',
    showLineNumber: false,
  },
};

export const DiffBlockExample: Story = {
  render: () => (
    <div style={{ fontFamily: "monospace" }}>
      <DiffLine type="context" content="{" lineNumber={1} showLineNumber />
      <DiffLine
        type="remove"
        content='  "name": "OldProject",'
        lineNumber={2}
        showLineNumber
      />
      <DiffLine
        type="add"
        content='  "name": "NewProject",'
        lineNumber={2}
        showLineNumber
      />
      <DiffLine
        type="context"
        content='  "version": "1.0.0",'
        lineNumber={3}
        showLineNumber
      />
      <DiffLine
        type="add"
        content='  "description": "Added description",'
        lineNumber={4}
        showLineNumber
      />
      <DiffLine type="context" content="}" lineNumber={5} showLineNumber />
    </div>
  ),
};

export const LongContent: Story = {
  args: {
    type: "add",
    content:
      '  "longProperty": "This is a very long value that might need to wrap or scroll in the diff viewer interface",',
    lineNumber: 10,
    showLineNumber: true,
  },
};
