import type { Meta, StoryObj } from "@storybook/react";
import { action } from "storybook/actions";
import { KnowledgeNodeCard } from "./KnowledgeNodeCard";
import type { KnowledgeNode } from "../types/knowledge";

const meta: Meta<typeof KnowledgeNodeCard> = {
  title: "KFlow/Molecules/KnowledgeNodeCard",
  component: KnowledgeNodeCard,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof KnowledgeNodeCard>;

const conceptNode: KnowledgeNode = {
  id: "js-closures",
  title: "Closures",
  description: "A closure is the combination of a function bundled with references to its surrounding state.",
  domain: "formal",
  discipline: "Computer Science",
  subject: "JavaScript",
  depth: 3,
  parentId: "js-core",
  childIds: ["js-closure-scope", "js-closure-memory"],
  resourceUrls: ["https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures"],
  notes: "",
  nodeType: "concept",
};

const rootNode: KnowledgeNode = {
  id: "js-root",
  title: "JavaScript",
  description: "A high-level, interpreted programming language.",
  domain: "formal",
  discipline: "Computer Science",
  subject: "JavaScript",
  depth: 0,
  parentId: "",
  childIds: ["js-closures", "js-es6", "js-dom"],
  resourceUrls: [],
  notes: "",
  nodeType: "root",
};

const resourceNode: KnowledgeNode = {
  id: "js-mdn",
  title: "MDN Web Docs",
  description: "The Mozilla Developer Network documentation for JavaScript.",
  domain: "formal",
  discipline: "Computer Science",
  subject: "JavaScript",
  depth: 2,
  parentId: "js-core",
  childIds: [],
  resourceUrls: ["https://developer.mozilla.org"],
  notes: "",
  nodeType: "resource",
};

export const Concept: Story = {
  args: {
    node: conceptNode,
    selectNodeEvent: "SELECT_NODE",
  },
};

export const Root: Story = {
  args: { node: rootNode },
};

export const Resource: Story = {
  args: { node: resourceNode },
};

export const NaturalDomain: Story = {
  args: {
    node: { ...conceptNode, domain: "natural", discipline: "Physics", subject: "Mechanics" },
  },
};
