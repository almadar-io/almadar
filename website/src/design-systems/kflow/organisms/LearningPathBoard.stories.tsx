import type { Meta, StoryObj } from "@storybook/react";
import { LearningPathBoard } from "./LearningPathBoard";
import type { KnowledgeNode } from "../types/knowledge";

const meta: Meta<typeof LearningPathBoard> = {
  title: "KFlow/Organisms/LearningPathBoard",
  component: LearningPathBoard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof LearningPathBoard>;

const pathNodes: KnowledgeNode[] = [
  { id: "js-closures", title: "Closures (JavaScript)", description: "Functions bundled with their lexical scope.", domain: "formal", discipline: "Computer Science", subject: "JavaScript", depth: 2, parentId: "js-scope", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "py-decorators", title: "Decorators (Python)", description: "Functions that modify other functions using closure patterns.", domain: "formal", discipline: "Computer Science", subject: "Python", depth: 3, parentId: "py-functions", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "haskell-monads", title: "Monads (Haskell)", description: "Abstract data type used to represent computations as a series of steps.", domain: "formal", discipline: "Computer Science", subject: "Haskell", depth: 4, parentId: "haskell-fp", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "math-category", title: "Category Theory", description: "Abstract branch of mathematics studying structures and relationships between them.", domain: "formal", discipline: "Mathematics", subject: "Mathematics", depth: 3, parentId: "math-abstract", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "phys-symmetry", title: "Symmetry in Physics", description: "Invariance under transformation — a deep connection to category theory.", domain: "natural", discipline: "Physics", subject: "Physics", depth: 3, parentId: "phys-foundations", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "phil-logic", title: "Formal Logic", description: "Study of valid inference, deeply connected to both math and physics.", domain: "social", discipline: "Philosophy", subject: "Philosophy", depth: 2, parentId: "phil-root", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
];

const connections = [
  { from: "js-closures", to: "py-decorators", reason: "Decorators are closures in disguise" },
  { from: "py-decorators", to: "haskell-monads", reason: "Both compose functions — monads generalize the pattern" },
  { from: "haskell-monads", to: "math-category", reason: "Monads are a concept from category theory" },
  { from: "math-category", to: "phys-symmetry", reason: "Symmetry groups form categories" },
  { from: "phys-symmetry", to: "phil-logic", reason: "Logical structures mirror physical symmetries" },
];

export const Default: Story = {
  args: {
    entity: {
      path: pathNodes,
      connections,
      startDomain: "formal",
      endDomain: "social",
    },
    selectNodeEvent: "SELECT_NODE",
  },
};

export const ShortPath: Story = {
  args: {
    entity: {
      path: pathNodes.slice(0, 3),
      connections: connections.slice(0, 2),
      startDomain: "formal",
      endDomain: "formal",
    },
    selectNodeEvent: "SELECT_NODE",
  },
};

export const EmptyPath: Story = {
  args: {
    entity: {
      path: [],
      connections: [],
      startDomain: "formal",
      endDomain: "natural",
    },
  },
};
