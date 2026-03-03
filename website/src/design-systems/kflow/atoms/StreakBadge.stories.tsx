import type { Meta, StoryObj } from "@storybook/react";
import { StreakBadge } from "./StreakBadge";

const meta: Meta<typeof StreakBadge> = {
  title: "KFlow/Atoms/StreakBadge",
  component: StreakBadge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StreakBadge>;

export const Day1: Story = { args: { streakDay: 1 } };
export const Day3: Story = { args: { streakDay: 3 } };
export const Day7: Story = { args: { streakDay: 7 } };
export const Day30: Story = { args: { streakDay: 30, size: "md" } };
