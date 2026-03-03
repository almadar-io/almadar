import type { Meta, StoryObj } from "@storybook/react";
import { DomainSummaryCard } from "./DomainSummaryCard";
import type { KnowledgeDomain } from "../types/knowledge";

const meta: Meta<typeof DomainSummaryCard> = {
  title: "KFlow/Molecules/DomainSummaryCard",
  component: DomainSummaryCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof DomainSummaryCard>;

const formalDomain: KnowledgeDomain = {
  id: "formal",
  name: "Formal Sciences",
  domain: "formal",
  description: "Mathematics, Computer Science, Logic, Linguistics",
  subjectCount: 42,
  nodeCount: 8500,
  maxDepth: 11,
};

const naturalDomain: KnowledgeDomain = {
  id: "natural",
  name: "Natural Sciences",
  domain: "natural",
  description: "Physics, Chemistry, Biology, Earth Sciences",
  subjectCount: 9,
  nodeCount: 2100,
  maxDepth: 7,
};

const socialDomain: KnowledgeDomain = {
  id: "social",
  name: "Social Sciences",
  domain: "social",
  description: "Languages, Economics, Psychology, Philosophy",
  subjectCount: 15,
  nodeCount: 3200,
  maxDepth: 8,
};

export const Formal: Story = {
  args: { domain: formalDomain },
};

export const Natural: Story = {
  args: { domain: naturalDomain },
};

export const Social: Story = {
  args: { domain: socialDomain },
};
