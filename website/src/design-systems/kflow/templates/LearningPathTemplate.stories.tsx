import type { Meta, StoryObj } from "@storybook/react";
import { LearningPathTemplate } from "./LearningPathTemplate";
import type { KnowledgeNode } from "../types/knowledge";

const meta: Meta<typeof LearningPathTemplate> = {
  title: "KFlow/Templates/LearningPathTemplate",
  component: LearningPathTemplate,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LearningPathTemplate>;

const pathNodes: KnowledgeNode[] = [
  { id: "stats-prob", title: "Probability Theory", description: "Foundation of statistical reasoning.", domain: "formal", discipline: "Mathematics", subject: "Statistics", depth: 2, parentId: "", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "phys-quantum", title: "Quantum Mechanics", description: "Physics at atomic scale uses probability amplitudes.", domain: "natural", discipline: "Physics", subject: "Physics", depth: 2, parentId: "", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "bio-genetics", title: "Genetics", description: "Heredity involves probabilistic outcomes.", domain: "natural", discipline: "Biology", subject: "Biology", depth: 2, parentId: "", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "econ-risk", title: "Risk Analysis", description: "Economic decision-making under uncertainty.", domain: "social", discipline: "Economics", subject: "Economy", depth: 3, parentId: "", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
];

const connections = [
  { from: "stats-prob", to: "phys-quantum", reason: "Quantum states are probability distributions" },
  { from: "phys-quantum", to: "bio-genetics", reason: "Molecular biology connects to quantum chemistry" },
  { from: "bio-genetics", to: "econ-risk", reason: "Genetic algorithms model risk optimization" },
];

export const Default: Story = {
  args: {
    entity: {
      path: pathNodes,
      connections,
      startDomain: "formal",
      endDomain: "social",
    },
  },
};
