import type { Meta, StoryObj } from "@storybook/react";
import { XpCounter } from "./XpCounter";

const meta: Meta<typeof XpCounter> = {
  title: "KFlow/Atoms/XpCounter",
  component: XpCounter,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof XpCounter>;

export const Default: Story = { args: { xp: 1250 } };
export const Formal: Story = { args: { xp: 800, domain: "formal" } };
export const Natural: Story = { args: { xp: 450, domain: "natural" } };
export const Social: Story = { args: { xp: 2100, domain: "social" } };
