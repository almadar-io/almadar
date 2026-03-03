import type { Meta, StoryObj } from "@storybook/react";
import { CrossDomainGraphTemplate } from "./CrossDomainGraphTemplate";
import type { KnowledgeNode, KnowledgeDomain } from "../../types/knowledge";

const meta: Meta<typeof CrossDomainGraphTemplate> = {
  title: "KFlow/Templates/CrossDomainGraphTemplate",
  component: CrossDomainGraphTemplate,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CrossDomainGraphTemplate>;

const domains: KnowledgeDomain[] = [
  { id: "formal", name: "Formal Sciences", domain: "formal", description: "Math, CS", subjectCount: 6, nodeCount: 1800, maxDepth: 11 },
  { id: "natural", name: "Natural Sciences", domain: "natural", description: "Physics, Bio", subjectCount: 4, nodeCount: 540, maxDepth: 9 },
  { id: "social", name: "Social Sciences", domain: "social", description: "Lang, History", subjectCount: 5, nodeCount: 1400, maxDepth: 13 },
];

const nodes: KnowledgeNode[] = [
  { id: "stats-prob", title: "Probability", description: "", domain: "formal", discipline: "Mathematics", subject: "Statistics", depth: 2, parentId: "", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "ml-nn", title: "Neural Networks", description: "", domain: "formal", discipline: "CS", subject: "Machine Learning", depth: 2, parentId: "", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "phys-qm", title: "Quantum Mechanics", description: "", domain: "natural", discipline: "Physics", subject: "Physics", depth: 2, parentId: "", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "bio-neuro", title: "Neurons", description: "", domain: "natural", discipline: "Biology", subject: "Neuroscience", depth: 2, parentId: "", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "econ-game", title: "Game Theory", description: "", domain: "social", discipline: "Economics", subject: "Economy", depth: 2, parentId: "", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
];

const links = [
  { sourceId: "stats-prob", targetId: "phys-qm", sharedTerm: "probability" },
  { sourceId: "ml-nn", targetId: "bio-neuro", sharedTerm: "neural networks" },
  { sourceId: "stats-prob", targetId: "econ-game", sharedTerm: "expected value" },
];

export const Default: Story = {
  args: {
    entity: { nodes, links, domains },
  },
};
