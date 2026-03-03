import type { Meta, StoryObj } from "@storybook/react";
import { KnowledgeSearchBoard } from "./KnowledgeSearchBoard";
import type { KnowledgeNode } from "../types/knowledge";

const meta: Meta<typeof KnowledgeSearchBoard> = {
  title: "KFlow/Organisms/KnowledgeSearchBoard",
  component: KnowledgeSearchBoard,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof KnowledgeSearchBoard>;

// Representative sample across domains
const sampleNodes: KnowledgeNode[] = [
  { id: "js-closures", title: "Closures", description: "A closure is a function bundled with references to its surrounding state.", domain: "formal", discipline: "Computer Science", subject: "JavaScript", depth: 2, parentId: "js-scope", childIds: [], resourceUrls: ["https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures"], notes: "", nodeType: "concept" },
  { id: "js-promises", title: "Promises", description: "An object representing the eventual completion or failure of an async operation.", domain: "formal", discipline: "Computer Science", subject: "JavaScript", depth: 2, parentId: "js-async", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "js-scope", title: "Lexical Scoping", description: "Variable accessibility determined by position within nested scopes.", domain: "formal", discipline: "Computer Science", subject: "JavaScript", depth: 1, parentId: "js-root", childIds: ["js-closures"], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "py-generators", title: "Generators", description: "Functions that can pause and resume execution, yielding values lazily.", domain: "formal", discipline: "Computer Science", subject: "Python", depth: 2, parentId: "py-iter", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "py-closures", title: "Closures", description: "Python closures capture variables from the enclosing scope.", domain: "formal", discipline: "Computer Science", subject: "Python", depth: 3, parentId: "py-functions", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "stats-bayes", title: "Bayesian Statistics", description: "A statistical approach using Bayes theorem to update probability estimates.", domain: "formal", discipline: "Mathematics", subject: "Statistics", depth: 2, parentId: "stats-inference", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "stats-regression", title: "Regression Analysis", description: "Statistical method for modeling relationships between variables.", domain: "formal", discipline: "Mathematics", subject: "Statistics", depth: 2, parentId: "stats-methods", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "phys-newton", title: "Newton's Laws", description: "Three laws of motion forming the foundation of classical mechanics.", domain: "natural", discipline: "Physics", subject: "Physics", depth: 2, parentId: "phys-mechanics", childIds: [], resourceUrls: ["https://en.wikipedia.org/wiki/Newton%27s_laws_of_motion"], notes: "", nodeType: "concept" },
  { id: "phys-thermo", title: "Thermodynamics", description: "Study of heat, work, temperature, and their relation to energy.", domain: "natural", discipline: "Physics", subject: "Physics", depth: 1, parentId: "phys-root", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "bio-dna", title: "DNA Structure", description: "Double helix structure encoding genetic information.", domain: "natural", discipline: "Biology", subject: "Biology", depth: 3, parentId: "bio-genetics", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "neuro-synapse", title: "Synaptic Transmission", description: "Process by which neurons communicate via chemical or electrical signals.", domain: "natural", discipline: "Biology", subject: "Neuroscience", depth: 3, parentId: "neuro-neural", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "es-subjunctive", title: "Subjunctive Mood", description: "Verb mood used for wishes, hypothetical situations, and demands.", domain: "social", discipline: "Languages", subject: "Spanish", depth: 3, parentId: "es-verbs", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "sl-cases", title: "Grammatical Cases", description: "Slovenian uses six grammatical cases to indicate noun function.", domain: "social", discipline: "Languages", subject: "Slovenian", depth: 2, parentId: "sl-grammar", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "hist-ww2", title: "World War II", description: "Global conflict from 1939-1945 involving most world nations.", domain: "social", discipline: "History", subject: "History", depth: 2, parentId: "hist-modern", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
  { id: "draw-perspective", title: "Perspective Drawing", description: "Technique for representing three-dimensional space on a flat surface.", domain: "social", discipline: "Art", subject: "Drawing", depth: 2, parentId: "draw-techniques", childIds: [], resourceUrls: [], notes: "", nodeType: "concept" },
];

export const Default: Story = {
  args: {
    entity: { nodes: sampleNodes },
    selectNodeEvent: "SELECT_NODE",
  },
};

export const FewNodes: Story = {
  args: {
    entity: { nodes: sampleNodes.slice(0, 5) },
    selectNodeEvent: "SELECT_NODE",
  },
};
