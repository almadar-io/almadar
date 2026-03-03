import type { Meta, StoryObj } from "@storybook/react";
import { DomainBadge } from "./DomainBadge";

const meta: Meta<typeof DomainBadge> = {
  title: "KFlow/Atoms/DomainBadge",
  component: DomainBadge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DomainBadge>;

export const Formal: Story = {
  args: { domain: "formal" },
};

export const Natural: Story = {
  args: { domain: "natural" },
};

export const Social: Story = {
  args: { domain: "social" },
};

export const MediumSize: Story = {
  args: { domain: "formal", size: "md" },
};

export const LargeSize: Story = {
  args: { domain: "natural", size: "lg" },
};
