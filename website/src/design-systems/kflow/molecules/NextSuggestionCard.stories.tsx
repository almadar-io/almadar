import type { Meta, StoryObj } from "@storybook/react";
import { NextSuggestionCard } from "./NextSuggestionCard";
import type { NextSuggestion } from "../types/knowledge";

const meta: Meta<typeof NextSuggestionCard> = {
  title: "KFlow/Molecules/NextSuggestionCard",
  component: NextSuggestionCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NextSuggestionCard>;

const makeSuggestion = (overrides: Partial<NextSuggestion>): NextSuggestion => ({
  type: "continue",
  title: "Closures in JavaScript",
  description: "Continue exploring how closures capture scope variables.",
  nodeId: "js-closures",
  subjectId: "javascript",
  domain: "formal",
  priority: 1,
  ...overrides,
});

export const Continue: Story = {
  args: { suggestion: makeSuggestion({}) },
};

export const Review: Story = {
  args: { suggestion: makeSuggestion({ type: "review", title: "Probability Theory", domain: "formal", description: "Scheduled for spaced review today." }) },
};

export const Explore: Story = {
  args: { suggestion: makeSuggestion({ type: "explore", title: "Quantum Mechanics", domain: "natural", description: "A new frontier awaits in natural sciences." }) },
};

export const Discovery: Story = {
  args: { suggestion: makeSuggestion({ type: "discovery", title: "Symmetry ↔ Category Theory", domain: "natural", description: "Newly discovered cross-domain connection!" }) },
};
