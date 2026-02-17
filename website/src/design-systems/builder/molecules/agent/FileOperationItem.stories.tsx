import type { Meta, StoryObj } from "@storybook/react";
import { FileOperationItem } from "./FileOperationItem";

const meta: Meta<typeof FileOperationItem> = {
  title: "Builder/Molecules/Agent/FileOperationItem",
  component: FileOperationItem,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FileOperationItem>;

export const Default: Story = {
  args: {
    operation: "read_file",
    path: "/src/index.ts",
  },
};

export const AllOperations: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <FileOperationItem operation="ls" path="/src/components/" />
      <FileOperationItem operation="read_file" path="/src/index.ts" />
      <FileOperationItem operation="write_file" path="/src/generated/output.ts" />
      <FileOperationItem operation="edit_file" path="/src/schema.orb" />
    </div>
  ),
};

export const Compact: Story = {
  args: {
    operation: "edit_file",
    path: "/projects/builder/design-system/organisms/DomainEditor.tsx",
    compact: true,
  },
};

export const WithSuccess: Story = {
  args: {
    operation: "write_file",
    path: "/src/generated/TaskManager.ts",
    success: true,
  },
};

export const WithFailure: Story = {
  args: {
    operation: "write_file",
    path: "/src/generated/output.ts",
    success: false,
  },
};
