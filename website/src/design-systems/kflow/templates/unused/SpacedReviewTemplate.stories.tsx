import type { Meta, StoryObj } from "@storybook/react";
import { SpacedReviewTemplate } from "./SpacedReviewTemplate";

const meta: Meta<typeof SpacedReviewTemplate> = {
  title: "KFlow/Templates/SpacedReviewTemplate",
  component: SpacedReviewTemplate,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SpacedReviewTemplate>;

export const Default: Story = {
  args: {
    entity: {
      items: [
        { nodeId: "js-closures", nodeTitle: "Closures", domain: "formal", subject: "JavaScript", lastReviewed: "2d ago", nextReviewAt: "2026-02-26", easeFactor: 2.5, interval: 4, repetitions: 3 },
        { nodeId: "phys-gravity", nodeTitle: "Gravity", domain: "natural", subject: "Physics", lastReviewed: "5d ago", nextReviewAt: "2026-02-26", easeFactor: 2.3, interval: 6, repetitions: 2 },
      ],
      currentIndex: 0,
      sessionStats: { reviewed: 0, skipped: 0, averageQuality: 0 },
    },
  },
};
