import type { Meta, StoryObj } from "@storybook/react";
import { DailyMenuBoard } from "./DailyMenuBoard";
import type { DailyMenuEntity } from "./DailyMenuBoard";
import type { KnowledgeNode, NextSuggestion, ReviewItem } from "../types/knowledge";

const meta: Meta<typeof DailyMenuBoard> = {
  title: "KFlow/Organisms/DailyMenuBoard",
  component: DailyMenuBoard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DailyMenuBoard>;

const recentNodes: KnowledgeNode[] = [
  { id: "js-closures", title: "Closures", description: "Functions with captured scope.", domain: "formal", discipline: "CS", subject: "JavaScript", depth: 2, parentId: "", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "phys-gravity", title: "Gravity", description: "Fundamental force of attraction.", domain: "natural", discipline: "Physics", subject: "Physics", depth: 1, parentId: "", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "econ-supply", title: "Supply & Demand", description: "Market equilibrium model.", domain: "social", discipline: "Economics", subject: "Economics", depth: 1, parentId: "", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
];

const suggestions: NextSuggestion[] = [
  { type: "continue", title: "Closures Deep Dive", description: "Continue exploring closure patterns.", nodeId: "js-closures-2", subjectId: "javascript", domain: "formal", priority: 1 },
  { type: "review", title: "Probability Theory", description: "Scheduled for review today.", nodeId: "math-prob", subjectId: "statistics", domain: "formal", priority: 0 },
  { type: "explore", title: "Quantum Mechanics", description: "New frontier in physics.", nodeId: "phys-quantum", subjectId: "physics", domain: "natural", priority: 2 },
  { type: "discovery", title: "Symmetry ↔ Groups", description: "Cross-domain connection found!", nodeId: "math-groups", subjectId: "mathematics", domain: "formal", priority: 1 },
];

const reviewsDue: ReviewItem[] = [
  { nodeId: "math-prob", nodeTitle: "Probability Theory", domain: "formal", subject: "Statistics", lastReviewed: "3 days ago", nextReviewAt: "2026-02-26", easeFactor: 2.5, interval: 4, repetitions: 3 },
  { nodeId: "bio-cell", nodeTitle: "Cell Biology", domain: "natural", subject: "Biology", lastReviewed: "1 week ago", nextReviewAt: "2026-02-26", easeFactor: 2.2, interval: 7, repetitions: 2 },
];

const fullEntity: DailyMenuEntity = {
  session: null,
  dailyProgress: {
    date: "2026-02-26",
    nodesExplored: 8,
    lessonsCompleted: 2,
    challengesPassed: 1,
    timeSpent: 1800,
    xpEarned: 450,
    streakDay: 5,
    reviewsDue: 2,
  },
  suggestions,
  reviewsDue,
  recentNodes,
  domains: [],
  subjects: [],
};

export const Default: Story = {
  args: { entity: fullEntity },
};

export const NoReviews: Story = {
  args: {
    entity: { ...fullEntity, reviewsDue: [] },
  },
};

export const EmptySuggestions: Story = {
  args: {
    entity: { ...fullEntity, suggestions: [], recentNodes: [] },
  },
};

export const FirstDay: Story = {
  args: {
    entity: {
      ...fullEntity,
      dailyProgress: { ...fullEntity.dailyProgress, streakDay: 1, nodesExplored: 0, xpEarned: 0 },
      suggestions: suggestions.slice(0, 1),
      reviewsDue: [],
      recentNodes: [],
    },
  },
};
