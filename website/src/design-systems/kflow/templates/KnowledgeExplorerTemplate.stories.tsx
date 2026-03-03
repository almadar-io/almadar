import type { Meta, StoryObj } from "@storybook/react";
import { KnowledgeExplorerTemplate } from "./KnowledgeExplorerTemplate";
import type { KnowledgeDomain, KnowledgeSubject } from "../types/knowledge";

const meta: Meta<typeof KnowledgeExplorerTemplate> = {
  title: "KFlow/Templates/KnowledgeExplorerTemplate",
  component: KnowledgeExplorerTemplate,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof KnowledgeExplorerTemplate>;

const domains: KnowledgeDomain[] = [
  { id: "formal", name: "Formal Sciences", domain: "formal", description: "Mathematics, Computer Science, Logic", subjectCount: 6, nodeCount: 1800, maxDepth: 11 },
  { id: "natural", name: "Natural Sciences", domain: "natural", description: "Physics, Biology, Chemistry", subjectCount: 3, nodeCount: 420, maxDepth: 9 },
  { id: "social", name: "Social Sciences", domain: "social", description: "Languages, History, Art", subjectCount: 4, nodeCount: 1100, maxDepth: 13 },
];

const subjects: KnowledgeSubject[] = [
  { id: "js", name: "JavaScript", domain: "formal", discipline: "Computer Science", nodeCount: 371, maxDepth: 9, fileSize: 241022, rootNodeId: "js-root" },
  { id: "stats", name: "Statistics", domain: "formal", discipline: "Mathematics", nodeCount: 254, maxDepth: 7, fileSize: 815175, rootNodeId: "stats-root" },
  { id: "python", name: "Python", domain: "formal", discipline: "Computer Science", nodeCount: 228, maxDepth: 8, fileSize: 120000, rootNodeId: "py-root" },
  { id: "java", name: "Java", domain: "formal", discipline: "Computer Science", nodeCount: 194, maxDepth: 5, fileSize: 138847, rootNodeId: "java-root" },
  { id: "math", name: "Mathematics", domain: "formal", discipline: "Mathematics", nodeCount: 234, maxDepth: 11, fileSize: 91000, rootNodeId: "math-root" },
  { id: "react", name: "React", domain: "formal", discipline: "Computer Science", nodeCount: 183, maxDepth: 6, fileSize: 98000, rootNodeId: "react-root" },
  { id: "physics", name: "Physics", domain: "natural", discipline: "Physics", nodeCount: 245, maxDepth: 7, fileSize: 190787, rootNodeId: "phys-root" },
  { id: "biology", name: "Biology", domain: "natural", discipline: "Biology", nodeCount: 146, maxDepth: 6, fileSize: 85000, rootNodeId: "bio-root" },
  { id: "neuro", name: "Neuroscience", domain: "natural", discipline: "Biology", nodeCount: 113, maxDepth: 9, fileSize: 72000, rootNodeId: "neuro-root" },
  { id: "spanish", name: "Spanish", domain: "social", discipline: "Languages", nodeCount: 771, maxDepth: 6, fileSize: 189692, rootNodeId: "es-root" },
  { id: "slovenian", name: "Slovenian", domain: "social", discipline: "Languages", nodeCount: 692, maxDepth: 6, fileSize: 175778, rootNodeId: "sl-root" },
  { id: "history", name: "History", domain: "social", discipline: "History", nodeCount: 207, maxDepth: 5, fileSize: 95000, rootNodeId: "hist-root" },
  { id: "drawing", name: "Drawing", domain: "social", discipline: "Art", nodeCount: 204, maxDepth: 6, fileSize: 78000, rootNodeId: "draw-root" },
];

export const Default: Story = {
  args: {
    entity: { domains, subjects },
  },
};
