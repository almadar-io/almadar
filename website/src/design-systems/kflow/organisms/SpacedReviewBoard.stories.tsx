import type { Meta, StoryObj } from "@storybook/react";
import { SpacedReviewBoard } from "./SpacedReviewBoard";
import type { ReviewItem } from "../types/knowledge";

const meta: Meta<typeof SpacedReviewBoard> = {
  title: "KFlow/Organisms/SpacedReviewBoard",
  component: SpacedReviewBoard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SpacedReviewBoard>;

const items: ReviewItem[] = [
  { nodeId: "js-closures", nodeTitle: "Closures (JavaScript)", domain: "formal", subject: "JavaScript", lastReviewed: "2 days ago", nextReviewAt: "2026-02-26", easeFactor: 2.5, interval: 4, repetitions: 3 },
  { nodeId: "phys-gravity", nodeTitle: "Newtonian Gravity", domain: "natural", subject: "Physics", lastReviewed: "5 days ago", nextReviewAt: "2026-02-26", easeFactor: 2.3, interval: 6, repetitions: 2 },
  { nodeId: "econ-gdp", nodeTitle: "GDP Calculation", domain: "social", subject: "Economics", lastReviewed: "1 week ago", nextReviewAt: "2026-02-26", easeFactor: 2.1, interval: 7, repetitions: 1 },
];

export const Default: Story = {
  args: {
    entity: {
      items,
      currentIndex: 0,
      sessionStats: { reviewed: 0, skipped: 0, averageQuality: 0 },
    },
  },
};

export const MidSession: Story = {
  args: {
    entity: {
      items,
      currentIndex: 1,
      sessionStats: { reviewed: 1, skipped: 0, averageQuality: 4 },
    },
  },
};

export const Complete: Story = {
  args: {
    entity: {
      items,
      currentIndex: 3,
      sessionStats: { reviewed: 2, skipped: 1, averageQuality: 3.5 },
    },
  },
};
