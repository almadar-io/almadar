import type { Meta, StoryObj } from "@storybook/react";
import { ReviewCard } from "./ReviewCard";
import type { ReviewItem } from "../types/knowledge";

const meta: Meta<typeof ReviewCard> = {
  title: "KFlow/Molecules/ReviewCard",
  component: ReviewCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ReviewCard>;

const sampleItem: ReviewItem = {
  nodeId: "js-closures",
  nodeTitle: "Closures (JavaScript)",
  domain: "formal",
  subject: "JavaScript",
  lastReviewed: "2 days ago",
  nextReviewAt: "2026-02-26",
  easeFactor: 2.5,
  interval: 4,
  repetitions: 3,
};

export const Default: Story = {
  args: { item: sampleItem },
};

export const WithAnswer: Story = {
  args: { item: sampleItem, showAnswer: true },
};

export const NaturalDomain: Story = {
  args: {
    item: { ...sampleItem, domain: "natural", nodeTitle: "Photosynthesis", subject: "Biology" },
    showAnswer: true,
  },
};
