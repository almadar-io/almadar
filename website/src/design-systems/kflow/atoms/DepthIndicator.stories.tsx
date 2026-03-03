import type { Meta, StoryObj } from "@storybook/react";
import { DepthIndicator } from "./DepthIndicator";

const meta: Meta<typeof DepthIndicator> = {
  title: "KFlow/Atoms/DepthIndicator",
  component: DepthIndicator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 200 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DepthIndicator>;

export const Shallow: Story = {
  args: { depth: 1 },
};

export const Mid: Story = {
  args: { depth: 5 },
};

export const Deep: Story = {
  args: { depth: 9 },
};

export const Maximum: Story = {
  args: { depth: 11 },
};

export const CustomMax: Story = {
  args: { depth: 3, maxDepth: 5 },
};
