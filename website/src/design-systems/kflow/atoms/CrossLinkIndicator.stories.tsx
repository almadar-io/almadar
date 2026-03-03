import type { Meta, StoryObj } from "@storybook/react";
import { CrossLinkIndicator } from "./CrossLinkIndicator";
import type { KnowledgeDomainType } from "../types/knowledge";

const meta: Meta<typeof CrossLinkIndicator> = {
  title: "KFlow/Atoms/CrossLinkIndicator",
  component: CrossLinkIndicator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CrossLinkIndicator>;

export const Formal: Story = {
  args: { targetDomain: "formal" },
};

export const Natural: Story = {
  args: { targetDomain: "natural" },
};

export const Social: Story = {
  args: { targetDomain: "social" },
};

export const Large: Story = {
  args: { targetDomain: "formal", size: "lg" },
};

export const AllDomains: Story = {
  render: () => {
    const domains: KnowledgeDomainType[] = ["formal", "natural", "social"];
    return (
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        {domains.map((d) => (
          <CrossLinkIndicator key={d} targetDomain={d} size="lg" />
        ))}
      </div>
    );
  },
};
