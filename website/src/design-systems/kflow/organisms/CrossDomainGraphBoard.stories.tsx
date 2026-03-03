import type { Meta, StoryObj } from "@storybook/react";
import { CrossDomainGraphBoard } from "./CrossDomainGraphBoard";
import type { KnowledgeNode, KnowledgeDomain } from "../types/knowledge";

const meta: Meta<typeof CrossDomainGraphBoard> = {
  title: "KFlow/Organisms/CrossDomainGraphBoard",
  component: CrossDomainGraphBoard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CrossDomainGraphBoard>;

const domains: KnowledgeDomain[] = [
  { id: "formal", name: "Formal Sciences", domain: "formal", description: "Mathematics, CS, Logic", subjectCount: 6, nodeCount: 1800, maxDepth: 11 },
  { id: "natural", name: "Natural Sciences", domain: "natural", description: "Physics, Biology, Chemistry", subjectCount: 4, nodeCount: 540, maxDepth: 9 },
  { id: "social", name: "Social Sciences", domain: "social", description: "Languages, History, Art", subjectCount: 5, nodeCount: 1400, maxDepth: 13 },
];

const crossNodes: KnowledgeNode[] = [
  // Formal
  { id: "stats-probability", title: "Probability Theory", description: "Study of random events and their likelihood.", domain: "formal", discipline: "Mathematics", subject: "Statistics", depth: 2, parentId: "stats-root", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "stats-bayes", title: "Bayesian Inference", description: "Updating probability estimates as evidence is observed.", domain: "formal", discipline: "Mathematics", subject: "Statistics", depth: 3, parentId: "stats-probability", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "ml-neural", title: "Neural Networks", description: "Computational models inspired by biological neural networks.", domain: "formal", discipline: "Computer Science", subject: "Machine Learning", depth: 2, parentId: "ml-root", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "ml-optimization", title: "Optimization", description: "Finding the best parameters to minimize loss.", domain: "formal", discipline: "Computer Science", subject: "Machine Learning", depth: 2, parentId: "ml-root", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "cs-algorithms", title: "Graph Algorithms", description: "Algorithms for traversing and analyzing graph structures.", domain: "formal", discipline: "Computer Science", subject: "Data Structures", depth: 3, parentId: "cs-graphs", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  // Natural
  { id: "phys-quantum", title: "Quantum Mechanics", description: "Physics at the atomic and subatomic scale.", domain: "natural", discipline: "Physics", subject: "Physics", depth: 2, parentId: "phys-root", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "phys-entropy", title: "Entropy", description: "Measure of disorder in a thermodynamic system.", domain: "natural", discipline: "Physics", subject: "Physics", depth: 3, parentId: "phys-thermo", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "bio-neurons", title: "Neurons", description: "Electrically excitable cells that process and transmit signals.", domain: "natural", discipline: "Biology", subject: "Neuroscience", depth: 2, parentId: "neuro-root", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "bio-evolution", title: "Evolution", description: "Change in heritable characteristics of biological populations.", domain: "natural", discipline: "Biology", subject: "Biology", depth: 2, parentId: "bio-root", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  // Social
  { id: "econ-game", title: "Game Theory", description: "Mathematical models of strategic interaction.", domain: "social", discipline: "Economics", subject: "Economy", depth: 2, parentId: "econ-root", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "phil-logic", title: "Formal Logic", description: "Study of valid inference and reasoning.", domain: "social", discipline: "Philosophy", subject: "Philosophy", depth: 2, parentId: "phil-root", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "hist-science", title: "History of Science", description: "How scientific knowledge has developed over time.", domain: "social", discipline: "History", subject: "History", depth: 3, parentId: "hist-root", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
];

const crossLinks = [
  // Formal ↔ Natural
  { sourceId: "stats-probability", targetId: "phys-quantum", sharedTerm: "probability" },
  { sourceId: "stats-bayes", targetId: "phys-quantum", sharedTerm: "probability distributions" },
  { sourceId: "ml-neural", targetId: "bio-neurons", sharedTerm: "neural networks" },
  { sourceId: "ml-optimization", targetId: "phys-entropy", sharedTerm: "entropy / loss" },
  // Formal ↔ Social
  { sourceId: "cs-algorithms", targetId: "econ-game", sharedTerm: "graph theory" },
  { sourceId: "stats-probability", targetId: "econ-game", sharedTerm: "expected value" },
  { sourceId: "ml-optimization", targetId: "econ-game", sharedTerm: "optimization" },
  // Natural ↔ Social
  { sourceId: "bio-evolution", targetId: "hist-science", sharedTerm: "natural selection" },
  { sourceId: "bio-neurons", targetId: "phil-logic", sharedTerm: "cognition" },
];

export const Default: Story = {
  args: {
    entity: { nodes: crossNodes, links: crossLinks, domains },
    selectNodeEvent: "SELECT_NODE",
  },
};

export const EmptyGraph: Story = {
  args: {
    entity: { nodes: [], links: [], domains },
  },
};
