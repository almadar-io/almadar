import type { Meta, StoryObj } from "@storybook/react";
import { KnowledgeSubjectTemplate } from "./KnowledgeSubjectTemplate";
import type { KnowledgeNode, KnowledgeSubject } from "../../types/knowledge";

const meta: Meta<typeof KnowledgeSubjectTemplate> = {
  title: "KFlow/Templates/KnowledgeSubjectTemplate",
  component: KnowledgeSubjectTemplate,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof KnowledgeSubjectTemplate>;

const jsSubject: KnowledgeSubject = {
  id: "formal-cs-javascript",
  name: "JavaScript",
  domain: "formal",
  discipline: "Computer Science",
  nodeCount: 15,
  maxDepth: 3,
  fileSize: 241022,
  rootNodeId: "javascript-javascript",
};

const rootNode: KnowledgeNode = {
  id: "javascript-javascript",
  title: "JavaScript",
  description: "A high-level, interpreted programming language.",
  domain: "formal",
  discipline: "Computer Science",
  subject: "JavaScript",
  depth: 0,
  parentId: "",
  childIds: ["javascript-scoping", "javascript-data-structures", "javascript-async"],
  resourceUrls: [],
  notes: "",
  nodeType: "root",
};

const sampleNodes: KnowledgeNode[] = [
  rootNode,
  {
    id: "javascript-scoping",
    title: "Scoping",
    description: "How variables are resolved in nested functions and blocks.",
    domain: "formal",
    discipline: "Computer Science",
    subject: "JavaScript",
    depth: 1,
    parentId: "javascript-javascript",
    childIds: ["javascript-closures"],
    resourceUrls: ["https://developer.mozilla.org/en-US/docs/Glossary/Scope"],
    notes: "",
    nodeType: "concept",
  },
  {
    id: "javascript-closures",
    title: "Closures",
    description: "Functions that retain access to their lexical scope.",
    domain: "formal",
    discipline: "Computer Science",
    subject: "JavaScript",
    depth: 2,
    parentId: "javascript-scoping",
    childIds: [],
    resourceUrls: ["https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures"],
    notes: "",
    nodeType: "concept",
  },
  {
    id: "javascript-data-structures",
    title: "Data Structures",
    description: "Arrays, objects, maps, sets, and typed arrays.",
    domain: "formal",
    discipline: "Computer Science",
    subject: "JavaScript",
    depth: 1,
    parentId: "javascript-javascript",
    childIds: [],
    resourceUrls: [],
    notes: "",
    nodeType: "concept",
  },
  {
    id: "javascript-async",
    title: "Async Programming",
    description: "Callbacks, promises, async/await.",
    domain: "formal",
    discipline: "Computer Science",
    subject: "JavaScript",
    depth: 1,
    parentId: "javascript-javascript",
    childIds: [],
    resourceUrls: [],
    notes: "",
    nodeType: "concept",
  },
];

export const Default: Story = {
  args: {
    entity: {
      subject: jsSubject,
      nodes: sampleNodes,
      rootNode,
    },
  },
};
