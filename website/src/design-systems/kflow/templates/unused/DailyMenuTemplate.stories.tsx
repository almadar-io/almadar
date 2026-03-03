import type { Meta, StoryObj } from "@storybook/react";
import { DailyMenuTemplate } from "./DailyMenuTemplate";
import type { DailyMenuEntity } from "./DailyMenuTemplate";

const meta: Meta<typeof DailyMenuTemplate> = {
  title: "KFlow/Templates/DailyMenuTemplate",
  component: DailyMenuTemplate,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DailyMenuTemplate>;

const entity: DailyMenuEntity = {
  session: null,
  dailyProgress: {
    date: "2026-02-26",
    nodesExplored: 5,
    lessonsCompleted: 1,
    challengesPassed: 0,
    timeSpent: 900,
    xpEarned: 200,
    streakDay: 3,
    reviewsDue: 4,
  },
  suggestions: [
    { type: "review", title: "Probability Theory", description: "Scheduled for review.", nodeId: "math-prob", subjectId: "statistics", domain: "formal", priority: 0 },
    { type: "continue", title: "Closures Deep Dive", description: "Continue closure patterns.", nodeId: "js-closures", subjectId: "javascript", domain: "formal", priority: 1 },
  ],
  reviewsDue: [
    { nodeId: "math-prob", nodeTitle: "Probability", domain: "formal", subject: "Statistics", lastReviewed: "3d ago", nextReviewAt: "2026-02-26", easeFactor: 2.5, interval: 4, repetitions: 3 },
  ],
  recentNodes: [
    { id: "js-closures", title: "Closures", description: "Functions capturing scope.", domain: "formal", discipline: "CS", subject: "JavaScript", depth: 2, parentId: "", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  ],
  domains: [],
  subjects: [],
};

export const Default: Story = {
  args: { entity },
};
