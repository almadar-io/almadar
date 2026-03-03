import type { Meta, StoryObj } from "@storybook/react";
import { CrossDomainLink } from "./CrossDomainLink";

const meta: Meta<typeof CrossDomainLink> = {
  title: "KFlow/Molecules/CrossDomainLink",
  component: CrossDomainLink,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CrossDomainLink>;

export const FormalToNatural: Story = {
  args: {
    fromTitle: "Statistics",
    fromDomain: "formal",
    toTitle: "Quantum Mechanics",
    toDomain: "natural",
    sharedTerm: "probability",
  },
};

export const NaturalToSocial: Story = {
  args: {
    fromTitle: "Neuroscience",
    fromDomain: "natural",
    toTitle: "Psychology",
    toDomain: "social",
    sharedTerm: "cognition",
  },
};

export const NoSharedTerm: Story = {
  args: {
    fromTitle: "Logic",
    fromDomain: "formal",
    toTitle: "Linguistics",
    toDomain: "social",
  },
};
