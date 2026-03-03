import type { Meta, StoryObj } from "@storybook/react";
import { NodeTypeIcon } from "./NodeTypeIcon";

const meta: Meta<typeof NodeTypeIcon> = {
  title: "KFlow/Atoms/NodeTypeIcon",
  component: NodeTypeIcon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NodeTypeIcon>;

export const Concept: Story = {
  args: { nodeType: "concept" },
};

export const Resource: Story = {
  args: { nodeType: "resource" },
};

export const Root: Story = {
  args: { nodeType: "root" },
};

export const Large: Story = {
  args: { nodeType: "concept", size: "lg" },
};

export const Small: Story = {
  args: { nodeType: "resource", size: "sm" },
};
