import type { Meta, StoryObj } from "@storybook/react";
import { DomainExplorerBoard } from "./DomainExplorerBoard";
import type { KnowledgeDomain, KnowledgeSubject, UserStoryProgress } from "../types/knowledge";

const meta: Meta<typeof DomainExplorerBoard> = {
  title: "KFlow/Organisms/DomainExplorerBoard",
  component: DomainExplorerBoard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof DomainExplorerBoard>;

const domains: KnowledgeDomain[] = [
  {
    id: "formal",
    name: "Formal Sciences",
    domain: "formal",
    description: "Mathematics, Computer Science, Logic, Linguistics",
    subjectCount: 8,
    nodeCount: 2100,
    maxDepth: 11,
  },
  {
    id: "natural",
    name: "Natural Sciences",
    domain: "natural",
    description: "Physics, Chemistry, Biology, Earth Sciences",
    subjectCount: 4,
    nodeCount: 540,
    maxDepth: 9,
  },
  {
    id: "social",
    name: "Social Sciences",
    domain: "social",
    description: "Languages, Economics, History, Philosophy",
    subjectCount: 5,
    nodeCount: 1400,
    maxDepth: 13,
  },
];

const subjects: KnowledgeSubject[] = [
  { id: "js", name: "JavaScript", domain: "formal", discipline: "Computer Science", nodeCount: 371, maxDepth: 9, fileSize: 241022, rootNodeId: "js-root" },
  { id: "asm", name: "Assembly Language", domain: "formal", discipline: "Computer Science", nodeCount: 141, maxDepth: 11, fileSize: 1775043, rootNodeId: "asm-root" },
  { id: "stats", name: "Statistics", domain: "formal", discipline: "Mathematics", nodeCount: 254, maxDepth: 7, fileSize: 815175, rootNodeId: "stats-root" },
  { id: "math", name: "Mathematics", domain: "formal", discipline: "Mathematics", nodeCount: 234, maxDepth: 11, fileSize: 91000, rootNodeId: "math-root" },
  { id: "python", name: "Python", domain: "formal", discipline: "Computer Science", nodeCount: 228, maxDepth: 8, fileSize: 120000, rootNodeId: "py-root" },
  { id: "react", name: "React", domain: "formal", discipline: "Computer Science", nodeCount: 183, maxDepth: 6, fileSize: 98000, rootNodeId: "react-root" },
  { id: "java", name: "Java", domain: "formal", discipline: "Computer Science", nodeCount: 194, maxDepth: 5, fileSize: 138847, rootNodeId: "java-root" },
  { id: "kotlin", name: "Kotlin", domain: "formal", discipline: "Computer Science", nodeCount: 191, maxDepth: 5, fileSize: 135000, rootNodeId: "kotlin-root" },
  { id: "physics", name: "Physics", domain: "natural", discipline: "Physics", nodeCount: 245, maxDepth: 7, fileSize: 190787, rootNodeId: "phys-root" },
  { id: "biology", name: "Biology", domain: "natural", discipline: "Biology", nodeCount: 146, maxDepth: 6, fileSize: 85000, rootNodeId: "bio-root" },
  { id: "neuro", name: "Neuroscience", domain: "natural", discipline: "Biology", nodeCount: 113, maxDepth: 9, fileSize: 72000, rootNodeId: "neuro-root" },
  { id: "cogsci", name: "Cognitive Science", domain: "natural", discipline: "Cognitive Science", nodeCount: 36, maxDepth: 6, fileSize: 28000, rootNodeId: "cog-root" },
  { id: "spanish", name: "Spanish", domain: "social", discipline: "Languages", nodeCount: 771, maxDepth: 6, fileSize: 189692, rootNodeId: "es-root" },
  { id: "slovenian", name: "Slovenian", domain: "social", discipline: "Languages", nodeCount: 692, maxDepth: 6, fileSize: 175778, rootNodeId: "sl-root" },
  { id: "history", name: "History", domain: "social", discipline: "History", nodeCount: 207, maxDepth: 5, fileSize: 95000, rootNodeId: "hist-root" },
  { id: "geography", name: "Geography", domain: "social", discipline: "Geography", nodeCount: 176, maxDepth: 13, fileSize: 82000, rootNodeId: "geo-root" },
  { id: "drawing", name: "Drawing", domain: "social", discipline: "Art", nodeCount: 204, maxDepth: 6, fileSize: 78000, rootNodeId: "draw-root" },
];

export const Default: Story = {
  args: {
    entity: { domains, subjects },
    selectSubjectEvent: "SELECT_SUBJECT",
  },
};

export const FormalOnly: Story = {
  args: {
    entity: {
      domains: [domains[0]],
      subjects: subjects.filter((s) => s.domain === "formal"),
    },
    selectSubjectEvent: "SELECT_SUBJECT",
  },
};

const userProgress: UserStoryProgress = {
  storiesCompleted: ["mars-bug", "silk-road"],
  subjectProgress: {
    js: { completed: 3, total: 5, gamesPlayed: 2, averageScore: 85, timeSpentMinutes: 45 },
    stats: { completed: 1, total: 3, gamesPlayed: 1, averageScore: 92, timeSpentMinutes: 20 },
    physics: { completed: 2, total: 4, gamesPlayed: 2, averageScore: 78, timeSpentMinutes: 35 },
    spanish: { completed: 0, total: 2, gamesPlayed: 0, averageScore: 0, timeSpentMinutes: 0 },
    cogsci: { completed: 0, total: 0, gamesPlayed: 0, averageScore: 0, timeSpentMinutes: 0 },
  },
  domainProgress: {
    formal: { completionPercent: 42, strongestSubject: "Statistics", weakestSubject: "Assembly Language" },
    natural: { completionPercent: 28, strongestSubject: "Physics", weakestSubject: "Cognitive Science" },
    social: { completionPercent: 15, strongestSubject: "History", weakestSubject: "Spanish" },
  },
  suggestedStories: [],
};

export const WithUserProgress: Story = {
  args: {
    entity: { domains, subjects, userProgress },
    selectSubjectEvent: "SELECT_SUBJECT",
  },
};
