import type { Meta, StoryObj } from "@storybook/react";
import { SessionOverlay } from "./SessionOverlay";

const meta: Meta<typeof SessionOverlay> = {
  title: "KFlow/Molecules/SessionOverlay",
  component: SessionOverlay,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SessionOverlay>;

export const Default: Story = {
  args: { timeSpent: 723, nodesVisited: 12, xpEarned: 340 },
};

export const JustStarted: Story = {
  args: { timeSpent: 45, nodesVisited: 2, xpEarned: 30 },
};

export const LongSession: Story = {
  args: { timeSpent: 3661, nodesVisited: 47, xpEarned: 1250 },
};
